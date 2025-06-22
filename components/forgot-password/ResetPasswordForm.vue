<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import z from 'zod'
import { PATH } from '~/config';
import FormFieldInput from '../common/FormFieldInput.vue';
import { updatePasswordForForgotPassword } from '~/composables';
import { handleFetchError } from '~/lib';
import type { ApiErrorResponse, ApiResponse, ApiResultModel } from '~/types/types';

const routerKey = useRouter();
const flowCookie = useCookie<{ step?: "forgot" | "otp" | "reset", email?: string }>('forgotFlow');
const email = flowCookie.value.email || "";
const errorStore = useErrorStore();
const { t } = useI18n();

const rawSchema = z.object({
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[^A-Za-z0-9]/,
            "Password must contain at least one special character"
        ),
    confirmPassword: z
        .string()
        .min(1, "Confirm Password is required")
        .min(8, "Password must be at least 8 characters"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


type FormValues = z.infer<typeof rawSchema>

const FormSchema = toTypedSchema(rawSchema)

const form = useForm({
    validationSchema: FormSchema,
    initialValues: {
        password: "",
        confirmPassword: "",
    },
    validateOnMount: false
});


const onSubmit = form.handleSubmit(({ password }: FormValues) => {
    updatePasswordForForgotPassword({
        email: email,
        newPassword: password,
    }).then((response: ApiResponse<ApiResultModel<any>>) => {
        console.log('Password reset response:', response);
        if (response.data.isSuccess) {
            // resetting the flow cookie to indicate the current step
            const flowCookie = useCookie<{ step?: "forgot" | "otp" | "reset" }>('forgotFlow', { default: () => ({ step: "forgot" }) });
            flowCookie.value = {};

            // TODO:: redirect to success reset password page
            routerKey.push(PATH.SIGNIN.path);
        }

    }).catch((error: ApiErrorResponse) => {
        handleFetchError({
            allowedFields: ['password', 'confirmPassword'],
            error: error,
            setErrors: form.setErrors,
            setErrorStore: errorStore.setError,
            t: t,
        });
    });
});

</script>

<template>
    <form class="flex flex-col gap-6" @submit="onSubmit" autoComplete="on">
        <!-- Password Field -->
        <FormFieldInput id="password" name="password" componentType="input"
            :label="$t('forgotPassword.form.reset.input.label.newPassword')" :other-props="{
                class: 'w-lg',
                type: 'password',
                placeholder: $t('forgotPassword.form.reset.input.placeholder.newPassword'),
                autocomplete: 'new-password'
            }" />

        <!-- Confirm Password Field -->
        <FormFieldInput id="confirmPassword" name="confirmPassword" componentType="input"
            :label="$t('forgotPassword.form.reset.input.label.reEnterNewPassword')" :other-props="{
                class: 'w-lg',
                type: 'password',
                placeholder: $t('forgotPassword.form.reset.input.placeholder.reEnterNewPassword'),
                autocomplete: 'new-password'
            }" />

        <!-- Submit Button -->
        <Button class="w-lg" type="submit">
            {{ $t('forgotPassword.form.reset.button.savePassword') }}
        </Button>
    </form>
</template>