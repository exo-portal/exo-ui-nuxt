<script setup lang="ts">
import z from 'zod';
import FormFieldInput from '../common/FormFieldInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { Button } from '../ui/button';


const rawSchema = z.object({
    firstName: z.string().min(1, "Firstname is required"),
    lastName: z.string().min(1, "Lastname is required"),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
    gender: z.string().min(1, "Date of Birth is required")
})
type FormValues = z.infer<typeof rawSchema>

const FormSchema = toTypedSchema(rawSchema)


const form = useForm({
    validationSchema: FormSchema,
    initialValues: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
    },
    validateOnMount: false
})

const onSubmit = form.handleSubmit(({ firstName, lastName }: FormValues) => {
    // This function is called when the form is submitted
    console.log('Form submitted!', { firstName, lastName });
    // You can add logic to handle the form submission here
});


</script>

<template>
    <form class="flex flex-col gap-6 w-lg" @submit="onSubmit" autoComplete="on">
        <div class="flex gap-4 items-start w-full">
            <!-- First Name -->
            <FormFieldInput id="firstName" name="firstName" componentType="input"
                :label="$t('register.form.personalDetails.input.label.firstName')" :other-props="{
                    type: 'text',
                    placeholder: $t('register.form.personalDetails.input.placeholder.firstName'),
                    autocomplete: 'given-name'
                }" />
            <!-- First Name -->
            <FormFieldInput id="lastName" name="lastName" componentType="input"
                :label="$t('register.form.personalDetails.input.label.lastName')" :other-props="{
                    type: 'text',
                    placeholder: $t('register.form.personalDetails.input.placeholder.lastName'),
                    autocomplete: 'family-name'
                }" />
        </div>
        <FormFieldInput id="dateOfBirth" name="dateOfBirth" componentType="input"
            :label="$t('register.form.personalDetails.input.label.dateOfBirth')" :other-props="{
                type: 'text',
                placeholder: $t('register.form.personalDetails.input.label.dateOfBirth'),
                autocomplete: 'family-name'
            }" />
        <FormFieldInput id="gender" name="gender" componentType="input"
            :label="$t('register.form.personalDetails.input.label.gender')" :other-props="{
                type: 'text',
                placeholder: $t('register.form.personalDetails.input.label.gender'),
                autocomplete: 'family-name'
            }" />
        <Button class="mt-4" type="submit">
            {{ $t('register.form.personalDetails.button.next') }}
        </Button>
    </form>
</template>