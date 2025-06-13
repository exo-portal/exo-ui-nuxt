<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import FormFieldInput from '../common/FormFieldInput.vue'
import { Button } from '../ui/button'
import { PATH } from '~/config'
import { redirectByUserRole, translate } from '~/lib'
import { UserIcon } from '~/assets'
import DOMPurify from 'dompurify'
import type { AccessLevelRole, ApiResponse, ApiResultModel, AuthenticationResponse, UserInterface } from '~/types/types'

const rawSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email address")
        .min(8, "Email must be at least 8 characters")
        .transform(val => val.replace(/[<>'"]/g, "")), // Remove potentially dangerous characters
    password: z
        .string()
        .trim()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[^A-Za-z0-9]/,
            "Password must contain at least one special character"
        )
        .transform(val => val.replace(/[<>'"]/g, "")), // Remove potentially dangerous characters
})

type FormValues = z.infer<typeof rawSchema>

const FormSchema = toTypedSchema(rawSchema)

const form = useForm({
    validationSchema: FormSchema,
    initialValues: {
        email: "",
        password: "",
    },
    validateOnMount: false
})

const router = useRouter();
const authStore = useAuthStore();

const onSubmit = form.handleSubmit(({ email, password }: FormValues) => {
    const cleanCredentials = {
        email: DOMPurify.sanitize(email),
        password: DOMPurify.sanitize(password)
    }
    loginUser(cleanCredentials)
        .then((response: ApiResponse<ApiResultModel<AuthenticationResponse>>) => {
            const result: ApiResultModel<AuthenticationResponse> = response.data;
            // Handle successful login
            if (result && result.isSuccess && result.resultData && result.resultData.user) {
                const user: UserInterface = result.resultData.user;
                const userRole: AccessLevelRole = result.resultData.accessLevelRole;
                // TODO:: Store user data in the auth store
                authStore.setIsLoggedIn(true);
                redirectByUserRole(userRole, router, user.id);
            }
        })
        .catch((error) => {
            // Handle login error
            console.error("Login failed:", error);
        });
})

const { t } = useI18n();
</script>

<template>
    <form class="flex flex-col gap-6" @submit="onSubmit" autoComplete="on">
        <!-- Email Field -->
        <FormFieldInput name="email" componentType="input" max="10" maxLength="5"
            :label="translate(t, 'register.form.signUp.input.label.email')" :other-props="{
                class: 'w-lg',
                type: 'email',
                placeholder: translate(t, 'register.form.signUp.input.placeholder.email'),
                autocomplete: 'email',
                inputSuffixIcon: UserIcon as Object
            }" />

        <!-- Password Field -->
        <div class="flex flex-col items-end gap-2">
            <FormFieldInput name="password" componentType="input"
                :label="translate(t, 'register.form.signUp.input.label.password')" :other-props="{
                    class: 'w-lg',
                    type: 'password',
                    placeholder: translate(t, 'register.form.signUp.input.placeholder.password'),
                    autocomplete: 'current-password',
                }" />
            <NuxtLink :to="PATH.FORGOT_PASSWORD.path" class="text-main-700 text-label hover:underline">
                {{ $t("login.form.signIn.button.forgotPassword") }}
            </NuxtLink>
        </div>

        <!-- Submit Button -->
        <Button class="w-lg" type="submit">
            {{ $t("login.form.signIn.button.signIn") }}
        </Button>

        <!-- Sign Up Link -->
        <div class="text-center mt-2 text-neutral-500 text-label">
            {{ $t("login.form.signIn.alreadyHaveAccount.text") }}
            <NuxtLink :to="PATH.SIGNUP.path" class="text-main-700 underline px-1">
                {{ $t("login.form.signIn.alreadyHaveAccount.signUp") }}
            </NuxtLink>
        </div>
    </form>
</template>