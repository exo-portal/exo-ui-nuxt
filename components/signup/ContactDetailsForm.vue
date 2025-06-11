<script setup lang="ts">
import z from 'zod';
import FormFieldInput from '../common/FormFieldInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import type { AccessLevelRole, ApiResponse, ApiResultModel, AuthenticationResponse, PhoneOption, UserInterface } from '~/types/types';
import ExoSuspense from '../common/ExoSuspense.vue';
import { Skeleton } from '../ui/skeleton';
import { redirectByUserRole } from '~/lib';

const registrationStore = useRegistrationStore();
const loading = ref(true);

const COUNTRY_OPTIONS = [
    { label: "Philippines", value: "Philippines" },
    { label: "United States", value: "United States" },
];
const CITY_OPTIONS = [{ label: "Cebu City", value: "Cebu City" }];
const STATE_OPTIONS = [{ label: "Cebu", value: "Cebu" }];
const BRGY_OPTIONS = [{ label: "Quiot Pardo", value: "Quiot Pardo" }];
const PHONE_OPTIONS: PhoneOption[] = [
    { label: "PH", value: "PH", icon: "/svg/national-flag/PH.svg", countryCode: "+63", phonePlaceholder: "+639 291 2231" },
    { label: "US", value: "US", icon: "/svg/national-flag/US.svg", countryCode: "+1", phonePlaceholder: "+1 123 456 7890" },
];

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
        country: registrationStore.data.country || "Philippines",
        phoneNumber: registrationStore.data.phoneNumber || "",
        address: registrationStore.data.address || "",
        state: registrationStore.data.state || "",
        city: registrationStore.data.city || "",
        barangay: registrationStore.data.barangay || "",
        postalCode: registrationStore.data.postalCode || "",
    },
    validateOnMount: false
});

watch(() => registrationStore.data, (newData) => {
    form.setValues({
        country: newData.country || "Philippines",
        phoneNumber: newData.phoneNumber || "",
        address: newData.address || "",
        state: newData.state || "",
        city: newData.city || "",
        barangay: newData.barangay || "",
        postalCode: newData.postalCode || "",
    });
});

const router = useRouter();

import DOMPurify from 'dompurify'

const onSubmit = form.handleSubmit((FormValues: FormValues) => {
    registrationStore.setData({
        ...FormValues
    });

    // TODO:: add sanization for all fields
    // Sanitize all string fields in FormValues using DOMPurify
    const sanitizedData: RegistrationData = Object.fromEntries(
        Object.entries(FormValues).map(([key, value]) => [
            key,
            typeof value === 'string' ? DOMPurify.sanitize(value) : value
        ])
    ) as unknown as RegistrationData;

    // Proceed with registration using the sanitized data
    registerUser(registrationStore.data)
        .then((response: ApiResponse<ApiResultModel<AuthenticationResponse>>) => {
            const result: ApiResultModel<AuthenticationResponse> = response.data;

            if (result && result.isSuccess && result.resultData) {
                const user: UserInterface = result.resultData.user;
                const userRole: AccessLevelRole = result.resultData.accessLevelRole || "ROLE_GUEST";
                const flowCookie = useCookie('registrationFlow');
                flowCookie.value = null;

                registrationStore.reset();
                redirectByUserRole(userRole, router, user.id);
            }
        }).catch((error) => {
            const errorResponse = error.response;
            console.error("Error during registration:", error);
            console.log(errorResponse);
        });
});

onMounted(() => {
    registrationStore.loadFromLocalStorage();
    loading.value = false;
});
</script>

<template>
    <ExoSuspense :loading="loading">
        <template #default>
            <form class="flex flex-col gap-6 w-lg" @submit.prevent="onSubmit" autoComplete="on">
                <!-- Country -->
                <FormFieldInput id="country" name="country" component-type="select"
                    :label="$t('register.form.contactDetails.input.label.country')" :other-props="{
                        options: COUNTRY_OPTIONS,
                        placeholder: $t('register.form.contactDetails.input.placeholder.country'),
                    }" />

                <!-- Phone Number -->
                <FormFieldInput id="phoneNumber" name="phoneNumber" component-type="tel"
                    :label="$t('register.form.contactDetails.input.label.phoneNumber')" :other-props="{
                        placeholder: $t('register.form.contactDetails.input.placeholder.phoneNumber'),
                        options: PHONE_OPTIONS,
                    }" />

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
        <template #fallback>
            <div class="flex flex-col gap-4 w-lg" data-testid="contact-details-form-skeleton" role="status"
                aria-busy="true">
                <!-- Country skeleton -->
                <div class="flex flex-col gap-2" data-testid="country-skeleton">
                    <Skeleton class="h-4 w-20" data-testid="country-label-skeleton" />
                    <Skeleton class="h-10 w-full rounded-xl" data-testid="country-input-skeleton" />
                </div>
                <!-- Phone number skeleton -->
                <div class="flex flex-col gap-2" data-testid="phone-skeleton">
                    <Skeleton class="h-4 w-32" data-testid="phone-label-skeleton" />
                    <Skeleton class="h-10 w-full rounded-xl" data-testid="phone-input-skeleton" />
                </div>
                <!-- Address skeleton -->
                <div class="flex flex-col gap-2" data-testid="address-skeleton">
                    <Skeleton class="h-4 w-24" data-testid="address-label-skeleton" />
                    <Skeleton class="h-10 w-full rounded-xl" data-testid="address-input-skeleton" />
                </div>
                <!-- state and city skeleton -->
                <div class="flex gap-4 items-start" data-testid="state-city-skeleton">
                    <div class="flex flex-col gap-2 w-full" data-testid="state-skeleton">
                        <Skeleton class="h-4 w-16" data-testid="state-label-skeleton" />
                        <Skeleton class="h-10 w-full rounded-xl" data-testid="state-input-skeleton" />
                    </div>
                    <div class="flex flex-col gap-2 w-full" data-testid="city-skeleton">
                        <Skeleton class="h-4 w-14" data-testid="city-label-skeleton" />
                        <Skeleton class="h-10 w-full rounded-xl" data-testid="city-input-skeleton" />
                    </div>
                </div>
                <!-- barangay and postal skeleton -->
                <div class="flex gap-4 items-start" data-testid="barangay-postal-skeleton">
                    <div class="flex flex-col gap-2 w-full" data-testid="barangay-skeleton">
                        <Skeleton class="h-4 w-20" data-testid="barangay-label-skeleton" />
                        <Skeleton class="h-10 w-full rounded-xl" data-testid="barangay-input-skeleton" />
                    </div>
                    <div class="flex flex-col gap-2 w-full" data-testid="postal-skeleton">
                        <Skeleton class="h-4 w-26" data-testid="postal-label-skeleton" />
                        <Skeleton class="h-10 w-full rounded-xl" data-testid="postal-input-skeleton" />
                    </div>
                </div>
                <Skeleton class="h-10 w-full mt-4 rounded-xl" data-testid="submit-skeleton" />
            </div>
        </template>
    </ExoSuspense>
</template>