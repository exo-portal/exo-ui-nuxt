<script setup lang="ts">
import z from 'zod';
import { PATH } from '~/config';
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
            <Button class="text-main-700 underline px-1" variant="link">
                {{ $t('forgotPassword.form.otp.button.didNotReceiveCode.resend') }}
            </Button>
        </div>
    </form>
</template>