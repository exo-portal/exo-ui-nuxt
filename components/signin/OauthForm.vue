<script lang="ts" setup>

const { GITHUB_OAUTH_FULL_URL, GOOGLE_OAUTH_FULL_URL } = useCustomAppConfig();

// Handlers for OAuth registration github provider
const registerUsingGithubHandler = () => {
    window.location.href = GITHUB_OAUTH_FULL_URL;
}

// Handlers for Oauth registration google provider
const registerUsingGoogleHandler = () => {
    window.location.href = GOOGLE_OAUTH_FULL_URL;
};

</script>
<template>
    <section class="flex items-center flex-col w-lg gap-11 justify-center">
        <div class="space-y-2 text-center">
            <h1 class="text-sub-heading-4 font-bold text-neutral-950">
                {{ $t("login.form.signIn.title") }}
            </h1>
            <h2 class="text-neutral-500 text-body-normal">
                {{ $t("login.form.signIn.subtitle") }}
            </h2>
        </div>
        <div class="flex flex-col space-y-4 w-lg">
            <Button @click="registerUsingGoogleHandler"
                class="font-semibold text-neutral-500 bg-transparent border-neutral-500 hover:bg-main-50 focus-visible:bg-main-200 focus:border-main-900 focus:text-main-900"
                variant="outline">
                {{ $t("login.form.signIn.button.google") }}
            </Button>
            <Button @click="registerUsingGithubHandler"
                class="font-semibold text-neutral-500 bg-transparent border-neutral-500 hover:bg-main-50 focus-visible:bg-main-200 focus:border-main-900 focus:text-main-900"
                variant="outline">
                {{ $t("login.form.signIn.button.github") }}
            </Button>
        </div>
    </section>
</template>