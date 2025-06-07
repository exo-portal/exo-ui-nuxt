<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import FormFieldInput from '../common/FormFieldInput.vue'
import { Button } from '../ui/button'
import { PATH } from '~/config'


const rawSchema = z
    .object({
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
        confirmPassword: z
            .string()
            .min(1, "Password is required")
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
        email: "",
        password: "",
        confirmPassword: "",
    },
    validateOnMount: false
})

const onSubmit = form.handleSubmit(({ email, password, confirmPassword }: FormValues) => {
    console.log('Form submitted!', { email, password, confirmPassword })
})
</script>

<template>
    <form class="flex flex-col gap-6" @submit="onSubmit">
        <!-- Email Field -->
        <FormFieldInput name="email" label="Email" componentType="input" max="10" placeholder="Enter Your Email"
            maxLength="5" :other-props="{
                class: 'w-lg',
                type: 'email',
                placeholder: 'Enter Your Email',
                autocomplete: 'email',
            }" />

        <!-- Password Field -->
        <FormFieldInput name="password" label="Password" componentType="input" :other-props="{
            class: 'w-lg',
            type: 'password',
            placeholder: 'Enter Your Password',
            autocomplete: 'current-password',
        }" />

        <!-- Confirm Password Field -->
        <FormFieldInput name="confirmPassword" label="Confirm Password" componentType="input" :other-props="{
            class: 'w-lg',
            type: 'password',
            placeholder: 'Enter Your Password',
            autocomplete: 'current-password',
        }" />

        <!-- Submit Button -->
        <Button class="w-lg" type="submit">
            {{ $t("login.form.signIn.button.signIn") }}
        </Button>

        <!-- Sign Up Link -->
        <div class="text-center mt-2 text-neutral-500 text-label">
            {{ $t("register.form.signUp.alreadyHaveAccount.text") }}
            <NuxtLink :to="PATH.SIGNIN.path" class="text-main-700 underline px-1">
                {{ $t("register.form.signUp.alreadyHaveAccount.signIn") }}
            </NuxtLink>
        </div>
    </form>
</template>