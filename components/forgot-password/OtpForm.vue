<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { FormControl, FormField, FormItem } from '../ui/form';
import { PinInput, PinInputGroup, PinInputSlot } from '../ui/pin-input';
import z from 'zod';
import { useForm } from 'vee-validate';
import { Button } from '../ui/button';
import { ref, watch } from 'vue';
import { PATH } from '~/config';
import type { ExoPortalErrorMessage } from '~/types/types';
import { handleFieldErrors } from '~/lib';
import FormMessage from '../ui/form/FormMessage.vue';

const router = useRouter();
const { t } = useI18n();

const formSchema = toTypedSchema(z.object({
    pin: z.array(z.coerce.string()).length(5, { message: 'Invalid input' }),
}))

const { handleSubmit, setFieldValue, values, setErrors } = useForm({
    validationSchema: formSchema,
    initialValues: {
        pin: ['', '', '', ''],
    },
})

const onSubmit = handleSubmit(({ pin }) => {

    const otp = pin.join('');
    verifyOtpForForgotPassword({ email: "javiergenepaul@gmail.com", otpCode: otp })
        .then((response) => {
            console.log('OTP verified successfully:', response);
            // setting the flow cookie to indicate the current step
            const flowCookie = useCookie<{ step?: "forgot" | "otp" | "reset" }>('forgotFlow', { default: () => ({ step: "forgot" }) });
            flowCookie.value.step = "reset";

            // TODO: Add logic to handle the pin input for resetting the password
            // This function is called when the form is submitted
            router.push(PATH.FORGOT_PASSWORD_RESET.path);
        }).catch((error) => {
            console.error('Error verifying OTP:', error);
            const errorResponse: ExoPortalErrorMessage = error.response.data;
            handleFieldErrors({
                errorResponse: errorResponse,
                setErrors: setErrors,
                allowedFields: ["pin"],
                t: t
            })
        });
})

const handleComplete = (e: string[]) => {
    const otp = e.join('');
    verifyOtpForForgotPassword({ email: "javiergenepaul@gmail.com", otpCode: otp })
        .then((response) => {
            console.log('OTP verified successfully:', response);
            // setting the flow cookie to indicate the current step
            const flowCookie = useCookie<{ step?: "forgot" | "otp" | "reset" }>('forgotFlow', { default: () => ({ step: "forgot" }) });
            flowCookie.value.step = "reset";

            // TODO: Add logic to handle the pin input for resetting the password
            // This function is called when the form is submitted
            router.push(PATH.FORGOT_PASSWORD_RESET.path);
        }).catch((error) => {
            console.error('Error verifying OTP:', error);
            const errorResponse: ExoPortalErrorMessage = error.response.data;
            handleFieldErrors({
                errorResponse: errorResponse,
                setErrors: setErrors,
                allowedFields: ["pin"],
                t: t
            })
        });
    // // setting the flow cookie to indicate the current step
    // const flowCookie = useCookie<{ step?: "forgot" | "otp" | "reset" }>('forgotFlow', { default: () => ({ step: "forgot" }) });
    // flowCookie.value.step = "reset";

    // // TODO: Add logic to handle the pin input for resetting the password
    // // This function is called when the pin input is completed
    // console.log('Pin input completed:', e.join(''));
    // router.push(PATH.FORGOT_PASSWORD_RESET.path);
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
        <FormField name="pin" v-slot="{ componentField, value }">
            <FormItem>
                <FormControl>
                    <PinInput id="pin-input" :model-value="value" class="flex gap-2 items-center mt-1" otp
                        :name="componentField.name" @complete="handleComplete" @update:model-value="(arrStr) => {
                            setFieldValue('pin', arrStr)
                        }">
                        <PinInputGroup>
                            <PinInputSlot v-for="(id, index) in 4" :key="id" :index="index" />
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