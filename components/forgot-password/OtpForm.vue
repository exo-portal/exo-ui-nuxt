<script setup lang="ts">
import z from 'zod';
import { PATH, RESEND_OTP_TIME } from '~/config';
import { ref, watch } from 'vue';
import { Button } from '../ui/button';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { handleFieldErrors, translate } from '~/lib';
import FormMessage from '../ui/form/FormMessage.vue';
import { FormControl, FormField, FormItem } from '../ui/form';
import { PinInput, PinInputGroup, PinInputSlot } from '../ui/pin-input';
import type { ApiResponse, ApiResultModel, ExoPortalErrorMessage } from '~/types/types';

const router = useRouter();
const { t } = useI18n();

const RESEND_OTP_KEY = 'otpResendTime';
const RESEND_OTP_INTERVAL = RESEND_OTP_TIME * 60 * 1000;

const resendCountdown = ref(0);
let countdownInterval: ReturnType<typeof setInterval> | null = null;

const getResendTime = () => {
    const cookie = useCookie<number>(RESEND_OTP_KEY);
    return cookie.value || 0;
};

const setResendTime = (timestamp: number) => {
    const cookie = useCookie<number>(RESEND_OTP_KEY);
    cookie.value = timestamp;
};

const clearCountdown = () => {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
};

const startCountdown = () => {
    clearCountdown();
    const update = () => {
        const now = Date.now();
        const resendTime = getResendTime();
        const diff = resendTime - now;
        resendCountdown.value = diff > 0 ? Math.ceil(diff / 1000) : 0;
        if (resendCountdown.value <= 0) {
            clearCountdown();
        }
    };
    update();
    countdownInterval = setInterval(update, 1000);
};

onMounted(() => {
    if (getResendTime() > Date.now()) {
        startCountdown();
    }
});

onUnmounted(() => {
    clearCountdown();
});


const flowCookie = useCookie<{ step?: "forgot" | "otp" | "reset", email?: string }>('forgotFlow');
const email = flowCookie.value.email || "";

const formSchema = toTypedSchema(z.object({
    pin: z.array(z.coerce.string())
        .min(1, { message: translate(t, "errorMessage.otpRequired") })
        .max(4, { message: translate(t, "errorMessage.otpMaxLength") }),
}));

const { handleSubmit, setFieldValue, values, setErrors } = useForm({
    validationSchema: formSchema,
    initialValues: {
        pin: ['', '', '', ''],
    },
})

/**
 * Verifies OTP for forgot password. On success, updates flow and redirects; on failure, handles errors.
 */
const verifyOtp = ({ email, otp }: { email: string, otp: string }) => {
    if (email) {
        verifyOtpForForgotPassword({ email: email, otpCode: otp })
            .then((response: ApiResponse<ApiResultModel<any>>) => {
                if (response.data.isSuccess) {
                    // setting the flow cookie to indicate the current step and store the email
                    const flowCookie = useCookie<{ step?: "forgot" | "otp" | "reset", email?: string }>('forgotFlow', { default: () => ({ step: "forgot" }) });
                    flowCookie.value.step = "reset";
                    flowCookie.value.email = email;

                    // Redirecting to the reset password page
                    router.push(PATH.FORGOT_PASSWORD_RESET.path);
                }
            }).catch((error) => {
                const errorResponse: ExoPortalErrorMessage = error.response.data;
                handleFieldErrors({
                    errorResponse: errorResponse,
                    setErrors: setErrors,
                    allowedFields: ["pin"],
                    t: t
                })
            });
    } else {
        router.back();
    }
}

/** Handles OTP form submission. */
const onSubmit = handleSubmit(({ pin }) => {
    const otp = pin.join('');
    verifyOtp({
        email: email,
        otp: otp
    });
})

/** Handles OTP input completion. */
const handleComplete = (e: string[]) => {
    const otp = e.join('');
    verifyOtp({
        email: email,
        otp: otp
    });
}

/**
 * Handles the logic for resending the OTP code during the forgot password process.
 * - If an email is present, it calls the resendOtpForForgotPassword API with the email.
 * - On successful response, updates the resend time and restarts the countdown timer.
 * - On error, logs the error (TODO: add user-facing error handling).
 * - If no email is present, navigates back to the previous route.
 */
const resendOtpCode = () => {
    if (email) {
        resendOtpForForgotPassword({ email: email })
            .then((response: ApiResponse<ApiResultModel<any>>) => {
                if (response.data.isSuccess) {
                    const nextTime = Date.now() + RESEND_OTP_INTERVAL;
                    setResendTime(nextTime);
                    startCountdown();
                }
            }).catch((error) => {
                // TODO:: add a toast for handling errors
                console.error("Error resending OTP:", error);
            });
    } else {
        router.back();
    }
}

const isPinComplete = ref(false);

watch(
    () => values.pin,
    (newVal) => {
        isPinComplete.value = Array.isArray(newVal) && newVal.filter(Boolean).length === 4;
    },
    { deep: true, immediate: true }
);
</script>

<template>
    <form class="w-full space-y-6" @submit="onSubmit">
        <FormField name="pin" v-slot="{ componentField, value, errors }">
            <FormItem>
                <FormControl>
                    <PinInput id="pin-input" :model-value="value" class="flex gap-2 items-center mt-1" otp
                        :name="componentField.name" @complete="handleComplete" @update:model-value="(arrStr) => {
                            setFieldValue('pin', arrStr)
                        }">
                        <PinInputGroup>
                            <PinInputSlot :ariaInvalid="!!(errors && errors.length)" v-for="(id, index) in 4" :key="id"
                                :index="index" />
                        </PinInputGroup>
                    </PinInput>
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" :disabled="!isPinComplete" class="w-full">
            {{ $t('forgotPassword.form.otp.button.verify') }}
        </Button>
        <div class="text-center text-neutral-500 text-label">
            {{ $t('forgotPassword.form.otp.button.didNotReceiveCode.text') }}
            <Button type="button" class="text-main-700 underline px-1" variant="link" @click="resendOtpCode"
                :disabled="resendCountdown > 0">
                <template v-if="resendCountdown > 0">
                    {{ $t('forgotPassword.form.otp.button.didNotReceiveCode.resend') }} ({{ Math.floor(resendCountdown /
                        60) }}:{{ (resendCountdown % 60).toString().padStart(2, '0') }})
                </template>
                <template v-else>
                    {{ $t('forgotPassword.form.otp.button.didNotReceiveCode.resend') }}
                </template>
            </Button>
        </div>
    </form>
</template>