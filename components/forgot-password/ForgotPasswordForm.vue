<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import FormFieldInput from '../common/FormFieldInput.vue'
import { PATH } from '~/config'

const router = useRouter();

const rawSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone number is required")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || // email validation
        /^(\+?\d{1,4})?[-.\s]?(\d{10,15})$/.test(val), // phone number validation (country code optional, simplified spacing)
      {
        message: "Enter a valid email or phone number.",
      }
    ),
})
type FormValues = z.infer<typeof rawSchema>

const FormSchema = toTypedSchema(rawSchema)

const form = useForm({
  validationSchema: FormSchema,
  initialValues: {
    identifier: ""
  },
  validateOnMount: false
})


const onSubmit = form.handleSubmit(({ identifier }: FormValues) => {
  // setting the flow cookie to indicate the current step
  const flowCookie = useCookie<{ step?: "forgot" | "otp" | "reset" }>('forgotFlow', { default: () => ({ step: "forgot" }) });
  flowCookie.value.step = "otp";

  // TODO: Add logic to handle the identifier (email or phone number) for sending OTP or reset link
  // This function is called when the form is submitted
  console.log('Form submitted!', { identifier })
  router.push(PATH.FORGOT_PASSWORD_OTP.path);
})
</script>

<template>
  <form class="flex flex-col gap-6" @submit="onSubmit" autoComplete="on">
    <!-- Identifier Field -->
    <FormFieldInput id="identifier" name="identifier" componentType="input"
      :label="$t('forgotPassword.form.enterEmail.identifier.label')" :other-props="{
        class: 'w-lg',
        type: 'text',
        placeholder: $t('forgotPassword.form.enterEmail.identifier.placeholder'),
        autocomplete: 'username'
      }" />

    <!-- Submit Button -->
    <Button class="w-lg" type="submit">
      {{ $t("forgotPassword.button.submit") }}
    </Button>

    <!-- Sign Up Link -->
    <div class="text-center mt-2 text-neutral-500 text-label">
      {{ $t("forgotPassword.form.alreadyHaveAccount.text") }}
      <NuxtLink :to="PATH.SIGNUP.path" class="text-main-700 underline px-1">
        {{ $t("forgotPassword.form.alreadyHaveAccount.signIn") }}
      </NuxtLink>
    </div>
  </form>
</template>