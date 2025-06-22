<script setup lang="ts">
import { toast } from 'vue-sonner';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Toaster } from '../ui/sonner';
import { translate } from '~/lib';
import type { TxKeyPath } from '~/i18n/i18n';
import 'vue-sonner/style.css'

const errorStore = useErrorStore();

const { t } = useI18n()

watch(
    () => errorStore.errorType,
    (newType) => {
        if (newType === 'toast') {
            toast.error(
                errorStore.errorMessage
                    ? translate(t, errorStore.errorMessage ? errorStore.errorMessage as TxKeyPath : 'common.errorMessage.defaultMessage')
                    : translate(t, 'common.errorMessage.defaultMessage')
            )
            errorStore.clearError()
        }
    }
)
</script>

<template>
    <AlertDialog :open="errorStore.errorType === 'modal'">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    {{ $t("common.errorMessage.title") }}
                </AlertDialogTitle>
                <AlertDialogDescription>
                    {{ $t(errorStore.errorMessage) || $t("common.errorMessage.defaultMessage") }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction @click="errorStore.clearError()">{{ $t("common.errorMessage.continueButton") }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    <Toaster :rich-colors="true" />
</template>