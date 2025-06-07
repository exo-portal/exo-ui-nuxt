<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import FormFieldInput from '../common/FormFieldInput.vue'
import { Button } from '../ui/button'
import { PATH } from '~/config'
import { translate } from '~/lib'

const rawSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address")
        .min(8, "Email must be at least 8 characters"),
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

const onSubmit = form.handleSubmit(({ email, password }: FormValues) => {
    console.log('Form submitted!', { email, password })
})
</script>

<template>
    <form class="flex flex-col gap-6" @submit="onSubmit">
        <!-- Email Field -->
        <FormFieldInput name="email" componentType="input" max="10" maxLength="5"
            :label="translate('register.form.signUp.input.label.email')" :other-props="{
                class: 'w-lg',
                type: 'email',
                placeholder: translate('register.form.signUp.input.placeholder.email'),
                autocomplete: 'email',
            }" />

        <!-- Password Field -->
        <div class="flex flex-col items-end gap-2">
            <FormFieldInput name="password" componentType="input"
                :label="translate('register.form.signUp.input.label.password')" :other-props="{
                    class: 'w-lg',
                    type: 'password',
                    placeholder: translate('register.form.signUp.input.placeholder.password'),
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