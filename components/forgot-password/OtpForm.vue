<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { FormControl, FormField, FormItem } from '../ui/form';
import { PinInput, PinInputGroup, PinInputSlot } from '../ui/pin-input';
import z from 'zod';
import { useForm } from 'vee-validate';
import { Button } from '../ui/button';
import { ref, watch } from 'vue';
import { PATH } from '~/config';

const router = useRouter();

const formSchema = toTypedSchema(z.object({
    pin: z.array(z.coerce.string()).length(5, { message: 'Invalid input' }),
}))

const { handleSubmit, setFieldValue, values, } = useForm({
    validationSchema: formSchema,
    initialValues: {
        pin: ['', '', '', ''],
    },
})

const onSubmit = handleSubmit(({ pin }) => {
    // This function is called when the form is submitted
    const flowCookie = useCookie<{ step?: "forgot" | "otp" | "reset" }>('forgotFlow', { default: () => ({ step: "forgot" }) });
    flowCookie.value.step = "reset";

    router.push(PATH.FORGOT_PASSWORD_RESET.path);
    console.log(pin.join(''));
})

const handleComplete = (e: string[]) => {
    // This function is called when the pin input is completed

    const flowCookie = useCookie<{ step?: "forgot" | "otp" | "reset" }>('forgotFlow', { default: () => ({ step: "forgot" }) });
    flowCookie.value.step = "reset";

    console.log('Pin input completed:', e.join(''));
    router.push(PATH.FORGOT_PASSWORD_RESET.path);
}

const isPinComplete = ref(false);

watch(
    () => values.pin,
    (newVal) => {
        isPinComplete.value = Array.isArray(newVal) && newVal.filter(Boolean).length === 4;
    },
    { deep: true, immediate: true }
);
</script>

<template>
    <form class="w-full space-y-6" @submit="onSubmit">
        <FormField name="pin" v-slot="{ componentField, value }">
            <FormItem>
                <FormControl>
                    <PinInput id="pin-input" :model-value="value" class="flex gap-2 items-center mt-1" otp
                        :name="componentField.name" @complete="handleComplete" @update:model-value="(arrStr) => {
                            setFieldValue('pin', arrStr)
                        }">
                        <PinInputGroup>
                            <PinInputSlot v-for="(id, index) in 4" :key="id" :index="index" />
                        </PinInputGroup>
                    </PinInput>
                </FormControl>
            </FormItem>
        </FormField>
        <Button type="submit" :disabled="!isPinComplete" class="w-full">
            {{ $t('forgotPassword.form.otp.button.verify') }}
        </Button>
        <div class="text-center text-neutral-500 text-label">
            {{ $t('forgotPassword.form.otp.button.didNotReceiveCode.text') }}
            <Button class="text-main-700 underline px-1" variant="link">
                {{ $t('forgotPassword.form.otp.button.didNotReceiveCode.resend') }}
            </Button>
        </div>
    </form>
</template>