<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '../ui/button'
import { PATH } from '~/config'
import { handleFieldErrors, translate } from '~/lib'
import { UserIcon } from '~/assets'
import { useRegistrationStore } from '~/stores/registrationStore'
import { Skeleton } from '../ui/skeleton'
import FormFieldInput from '../common/FormFieldInput.vue'
import ExoSuspense from '../common/ExoSuspense.vue'
import type { ExoPortalErrorMessage } from '~/types/types'

const router = useRouter();
const { t } = useI18n();
const registratioStore = useRegistrationStore();
const loading = ref(true);

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
        email: registratioStore.data.email || "",
        password: registratioStore.data.password || "",
        confirmPassword: registratioStore.data.confirmPassword || "",
    },
    validateOnMount: false
});

watch(
    () => registratioStore.data,
    (newData) => {
        form.setValues({
            email: newData.email || "",
            password: newData.password || "",
            confirmPassword: newData.confirmPassword || "",
        })
    },
    { immediate: true, deep: true }
)

const onSubmit = form.handleSubmit(({ email, password, confirmPassword }: FormValues) => {
    validateEmail({ email })
        .then((respone) => {
            if (respone.status === 200) {
                registratioStore.setData({
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                });

                // setting the flow cookie to indicate the current step
                const flowCookie = useCookie<{ step?: "register" | "personal" | "contact" }>('registrationFlow', { default: () => ({ step: "register" }) });
                flowCookie.value.step = "personal";

                router.push(PATH.SIGNUP_PERSONAL_DETAILS.path);
            }
        }).catch((error) => {
            const errorResponse: ExoPortalErrorMessage = error.response.data;

            handleFieldErrors({
                errorResponse: errorResponse,
                setErrors: form.setErrors,
                allowedFields: ["email"],
                t: t
            })
        });
})


onMounted(() => {
    registratioStore.loadFromLocalStorage();
    loading.value = false
});
</script>

<template>
    <ExoSuspense :loading="loading">
        <template #default>
            <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
                <!-- Email Field -->
                <FormFieldInput name="email" :label="translate(t, 'register.form.signUp.input.label.email')"
                    componentType="input" max="10"
                    :placeholder="translate(t, 'register.form.signUp.input.placeholder.email')" maxLength="5"
                    :other-props="{
                        type: 'email',
                        placeholder: translate(t, 'register.form.signUp.input.placeholder.email'),
                        autocomplete: 'email',
                        inputSuffixIcon: UserIcon as Object
                    }" />

                <!-- Password Field -->
                <FormFieldInput name="password" componentType="input"
                    :label="translate(t, 'register.form.signUp.input.placeholder.password')" :other-props="{
                        type: 'password',
                        placeholder: translate(t, 'register.form.signUp.input.placeholder.password'),
                        autocomplete: 'current-password',
                    }" />

                <!-- Confirm Password Field -->
                <FormFieldInput name="confirmPassword" componentType="input"
                    :label="translate(t, 'register.form.signUp.input.placeholder.reEnterPassword')" :other-props="{
                        type: 'password',
                        placeholder: translate(t, 'register.form.signUp.input.placeholder.reEnterPassword'),
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
        <template #fallback>
            <div class="flex flex-col gap-4 w-lg" role="status" aria-busy="true" data-testid="email-form-skeleton">
                <div class="flex flex-col gap-2" data-testid="email-field-skeleton">
                    <Skeleton class="h-4 w-10" data-testid="email-label-skeleton" />
                    <Skeleton class="h-10 w-full rounded-xl" data-testid="email-input-skeleton" />
                </div>
                <div class="flex flex-col gap-2" data-testid="password-field-skeleton">
                    <Skeleton class="h-4 w-20" data-testid="password-label-skeleton" />
                    <Skeleton class="h-10 w-full rounded-xl" data-testid="password-input-skeleton" />
                </div>
                <div class="flex flex-col gap-2" data-testid="confirm-field-skeleton">
                    <Skeleton class="h-4 w-44" data-testid="confirm-label-skeleton" />
                    <Skeleton class="h-10 w-full rounded-xl" data-testid="confirm-input-skeleton" />
                </div>
                <Skeleton class="h-10 w-full rounded-xl" data-testid="submit-skeleton" />
                <div class="flex justify-center" data-testid="footer-skeleton">
                    <Skeleton class="h-4 w-3/4 rounded-xl" data-testid="footer-text-skeleton" />
                </div>
            </div>
        </template>
    </ExoSuspense>
</template>