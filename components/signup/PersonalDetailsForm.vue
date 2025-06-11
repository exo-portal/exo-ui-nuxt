<script setup lang="ts">
import z from 'zod';
import FormFieldInput from '../common/FormFieldInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { Button } from '../ui/button';
import { PATH } from '~/config';
import ExoSuspense from '../common/ExoSuspense.vue';
import { Skeleton } from '../ui/skeleton';

const router = useRouter();
const registrationStore = useRegistrationStore();
const loading = ref(true);

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

const FormSchema = toTypedSchema(rawSchema);
type FormValues = z.infer<typeof rawSchema>;

const form = useForm({
    validationSchema: FormSchema,
    initialValues: {
        firstName: registrationStore.data.firstName || "",
        lastName: registrationStore.data.lastName || "",
        dateOfBirth: registrationStore.data.dateOfBirth || "",
        gender: registrationStore.data.gender || "",
    },
    validateOnMount: false
});

watch(() => registrationStore.data, (newData) => {
    form.setValues({
        firstName: registrationStore.data.firstName || "",
        lastName: registrationStore.data.lastName || "",
        dateOfBirth: registrationStore.data.dateOfBirth || "",
        gender: registrationStore.data.gender || "",
    })
}, { immediate: true, deep: true });


const onSubmit = form.handleSubmit(({ firstName, lastName, dateOfBirth, gender }: FormValues) => {
    // setting the flow cookie to indicate the current step
    const flowCookie = useCookie<{ step?: "register" | "personal" | "contact" }>('registrationFlow', { default: () => ({ step: "register" }) });
    flowCookie.value.step = "contact";

    // You can add logic to handle the form submission here
    registrationStore.setData({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        gender: gender as any
    });
    router.push(PATH.SIGNUP_CONTACT_DETAILS.path);
});


// Load data from local storage when the component is mounted
onMounted(() => {
    registrationStore.loadFromLocalStorage();
    loading.value = false;
})
</script>

<template>
    <ExoSuspense :loading="loading">
        <template #default>
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
        <template #fallback>
            <div data-testid="personal-details-form-skeleton" class="flex flex-col gap-4 w-lg" role="status"
                aria-busy="true">
                <!-- first name and last name skeleton -->
                <div class="flex gap-4 items-start">
                    <div class="flex flex-col gap-2 w-full">
                        <Skeleton class="h-4 w-26" />
                        <Skeleton class="h-10 w-full rounded-xl" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <Skeleton class="h-4 w-26" />
                        <Skeleton class="h-10 w-full rounded-xl" />
                    </div>
                </div>
                <!-- Date of birth skeleton -->
                <div class="flex flex-col gap-2">
                    <Skeleton class="h-4 w-24" />
                    <Skeleton class="h-10 w-full rounded-xl" />
                </div>
                <!-- Gender Skeleton -->
                <div class="flex flex-col gap-2">
                    <Skeleton class="h-4 w-20" />
                    <Skeleton class="h-10 w-full rounded-xl" />
                </div>
                <!-- Next Button Skeleton -->
                <Skeleton class="h-10 w-full mt-4 rounded-xl" />
            </div>
        </template>
    </ExoSuspense>
</template>