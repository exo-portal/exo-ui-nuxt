<script setup lang="ts">
import z from 'zod';
import FormFieldInput from '../common/FormFieldInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

const COUNTRY_OPTIONS = [
    { label: "Philippines", value: "Philippines" },
    { label: "United States", value: "United States" },
];
const CITY_OPTIONS = [{ label: "Cebu City", value: "Cebu City" }];
const STATE_OPTIONS = [{ label: "Cebu", value: "Cebu" }];
const BRGY_OPTIONS = [{ label: "Quiot Pardo", value: "Quiot Pardo" }];

const rawSchema = z.object({
    phoneNumber: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    barangay: z.string().min(1, "Barangay is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
})

type FormValues = z.infer<typeof rawSchema>
const FormSchema = toTypedSchema(rawSchema)

const form = useForm({
    validationSchema: FormSchema,
    initialValues: {
        country: "",
        phoneNumber: "",
        address: "",
        state: "",
        city: "",
        barangay: "",
        postalCode: "",
    },
    validateOnMount: false
})

const onSubmit = form.handleSubmit(({ country, phoneNumber, address, state, city, barangay, postalCode }: FormValues) => {
    // setting the flow cookie to indicate the current step
    const flowCookie = useCookie<{ step?: "register" | "personal" | "contact" | {} }>('registrationFlow', { default: () => ({ step: "register" }) });
    flowCookie.value.step = {};

    console.log("Form submitted with values:", {
        country,
        phoneNumber,
        address,
        state,
        city,
        barangay,
        postalCode
    });
});
</script>

<template>
    <form class="flex flex-col gap-6 w-lg" @submit="onSubmit" autoComplete="on">
        <!-- Country -->
        <FormFieldInput id="country" name="country" component-type="select"
            :label="$t('register.form.contactDetails.input.label.country')" :other-props="{
                options: COUNTRY_OPTIONS,
                placeholder: $t('register.form.contactDetails.input.placeholder.country'),
            }" />

        <!-- Phone Number -->
        <div class="flex items-start">
            <FormFieldInput id="state" name="state" component-type="select"
                :label="$t('register.form.contactDetails.input.label.state')" :other-props="{
                    options: STATE_OPTIONS,
                    placeholder: $t('register.form.contactDetails.input.placeholder.state'),
                }" />
            <FormFieldInput id="phoneNumber" name="phoneNumber" component-type="input"
                :label="$t('register.form.contactDetails.input.label.phoneNumber')" :other-props="{
                    type: 'tel',
                    placeholder: $t('register.form.contactDetails.input.placeholder.phoneNumber'),
                    autocomplete: 'tel'
                }" />
        </div>

        <!-- Address -->
        <FormFieldInput id="address" name="address" component-type="input"
            :label="$t('register.form.contactDetails.input.label.address')" :other-props="{
                type: 'text',
                placeholder: $t('register.form.contactDetails.input.placeholder.address'),
                autocomplete: 'address-line1'
            }" />

        <!-- State and City -->
        <div class="flex gap-4 items-start">
            <FormFieldInput id="state" name="state" component-type="select"
                :label="$t('register.form.contactDetails.input.label.state')" :other-props="{
                    options: STATE_OPTIONS,
                    placeholder: $t('register.form.contactDetails.input.placeholder.state'),
                }" />
            <FormFieldInput id="city" name="city" component-type="select"
                :label="$t('register.form.contactDetails.input.label.city')" :other-props="{
                    options: CITY_OPTIONS,
                    placeholder: $t('register.form.contactDetails.input.placeholder.city'),
                }" />
        </div>

        <!-- Barangay and Postal Code -->
        <div class="flex gap-4 items-start">
            <FormFieldInput id="barangay" name="barangay" component-type="select"
                :label="$t('register.form.contactDetails.input.label.barangay')" :other-props="{
                    type: 'text',
                    placeholder: $t('register.form.contactDetails.input.placeholder.barangay'),
                    autocomplete: 'address-level2',
                    options: BRGY_OPTIONS
                }" />
            <FormFieldInput id="postalCode" name="postalCode" component-type="input"
                :label="$t('register.form.contactDetails.input.label.postalCode')" :other-props="{
                    type: 'text',
                    placeholder: $t('register.form.contactDetails.input.placeholder.postalCode'),
                    autocomplete: 'postal-code'
                }" />
        </div>

        <!-- Next Button -->
        <Button class="mt-4" type="submit">
            {{ $t('register.form.contactDetails.button.submit') }}
        </Button>
    </form>
</template>