<script setup lang="ts">
import z from 'zod';
import FormFieldInput from '../common/FormFieldInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { Button } from '../ui/button';
import { PATH } from '~/config';

const router = useRouter();

const GENDER_OPTIONS = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "other", label: "other" },
];

const rawSchema = z.object({
    firstName: z.string().min(1, "Firstname is required"),
    lastName: z.string().min(1, "Lastname is required"),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
    gender: z.enum(
        [...GENDER_OPTIONS.map((option) => option.value)] as [
            string,
            ...string[]
        ],
        {
            errorMap: (issue) => {
                if (issue.code === "invalid_enum_value") {
                    return { message: "Gender is required" };
                }
                return { message: "Gender must be one of: male, female, other" };
            },
        }
    ),
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

const onSubmit = form.handleSubmit(({ firstName, lastName, dateOfBirth, gender }: FormValues) => {
    // This function is called when the form is submitted
    console.log('Form submitted!', { firstName, lastName, dateOfBirth, gender });
    // You can add logic to handle the form submission here
    router.push(PATH.SIGNUP_CONTACT_DETAILS.path);
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

        <!-- Date of Birth -->
        <FormFieldInput id="dateOfBirth" name="dateOfBirth" componentType="datePicker"
            :label="$t('register.form.personalDetails.input.label.dateOfBirth')" :other-props="{
                type: 'text',
                placeholder: $t('register.form.personalDetails.input.placeholder.dateOfBirth'),
                autocomplete: 'family-name'
            }" />

        <!-- Gender -->
        <FormFieldInput id="gender" name="gender" componentType="select"
            :label="$t('register.form.personalDetails.input.label.gender')" :other-props="{
                type: 'text',
                placeholder: $t('register.form.personalDetails.input.label.gender'),
                autocomplete: 'family-name',
                options: GENDER_OPTIONS
            }" />

        <!-- Next Button -->
        <Button class="mt-4" type="submit">
            {{ $t('register.form.personalDetails.button.next') }}
        </Button>
    </form>
</template>