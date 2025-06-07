<template>
    <div class="flex items-center w-lg gap-4 justify-center" data-testid="divider-form">
        <hr class="flex-1 border-t border-neutral-200" />
        <span class="text-body-normal text-neutral-400" data-testid="divider-text">
            {{ $t("login.form.signIn.or") }}
        </span>
        <hr class="flex-1 border-t border-neutral-200" />
    </div>
</template>