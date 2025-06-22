<script setup lang="ts">
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

const errorStore = useErrorStore();
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
</template>