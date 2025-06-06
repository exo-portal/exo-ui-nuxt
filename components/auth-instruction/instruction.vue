<script setup lang="ts">
import { PATH } from '@/config'
import type { InstructionConfig } from '~/types/types'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import InstructionBadge from '~/components/auth-instruction/InstructionBadge.vue'
import InstructionContainer from '~/components/auth-instruction/InstructionContainer.vue'

const INSTRUCTION_CONFIG: Record<string, InstructionConfig> = {
    // sign in
    [PATH.SIGNIN.path]: {
        title: 'login.instruction.title',
        subTitle: 'login.instruction.subtitle',
        topBadgeTitleKey: 'login.instruction.topBadge.title',
        bottomBadgeTitleKey: 'login.instruction.bottomBadge.title',
        topBadgeData: {
            count: 1,
            keyPrefix: 'login.instruction.topBadge.badgeTitle'
        },
        bottomBadgeData: {
            count: 2,
            keyPrefix: 'login.instruction.bottomBadge.badgeTitle',
        },
    },

    // SIGNUP ROUTES
    [PATH.SIGNUP.path]: {
        title: 'register.instruction.register.title.1',
        subTitle: 'register.instruction.register.subtitle.1',
        topBadgeTitleKey: 'register.instruction.register.topBadge.title',
        bottomBadgeTitleKey: 'register.instruction.register.bottomBadge.title',
        topBadgeData: {
            count: 1,
            keyPrefix: 'register.instruction.register.topBadge.badgeTitle',
        },
        bottomBadgeData: {
            count: 3,
            keyPrefix: 'register.instruction.register.bottomBadge.badgeTitle',
        },
    },
    [PATH.SIGNUP_PERSONAL_DETAILS.path]: {
        title: 'register.instruction.register.title.2',
        subTitle: 'register.instruction.register.subtitle.2',
        topBadgeTitleKey: 'register.instruction.personalDetails.topBadge.title',
        topBadgeData: {
            count: 2,
            keyPrefix: 'register.instruction.personalDetails.topBadge.badgeTitle',
        },
        bottomBadgeData: undefined,
        bottomBadgeTitleKey: undefined,
    },
    [PATH.SIGNUP_CONTACT_DETAILS.path]: {
        title: 'register.instruction.register.title.2',
        subTitle: 'register.instruction.register.subtitle.2',
        topBadgeTitleKey: 'register.instruction.contactDetails.topBadge.title',
        topBadgeData: {
            count: 2,
            keyPrefix: 'register.instruction.contactDetails.topBadge.badgeTitle',
        },
        bottomBadgeData: undefined,
        bottomBadgeTitleKey: undefined,
    },
    // FORGOT PASSWORD ROUTES
    [PATH.FORGOT_PASSWORD.path]: {
        title: "forgotPassword.instruction.enterEmail.title",
        subTitle: "forgotPassword.instruction.enterEmail.subtitle",
        topBadgeTitleKey: "forgotPassword.instruction.enterEmail.topBadge.title",
        topBadgeData: {
            count: 2,
            keyPrefix: "forgotPassword.instruction.enterEmail.topBadge.badgeTitle",
        },
    },
    // FORGOT PASSWORD OTP ROUTES
    [PATH.FORGOT_PASSWORD_OTP.path]: {
        title: "forgotPassword.instruction.otp.title",
        subTitle: "forgotPassword.instruction.otp.subtitle",
        topBadgeTitleKey: "forgotPassword.instruction.otp.topBadge.title",
        topBadgeData: {
            count: 3,
            keyPrefix: "forgotPassword.instruction.otp.topBadge.badgeTitle",
        },
    },
    // FORGOT PASSWORD RESET ROUTES
    [PATH.FORGOT_PASSWORD_RESET.path]: {
        title: "forgotPassword.instruction.reset.title",
        subTitle: "forgotPassword.instruction.reset.subtitle",
        topBadgeTitleKey: "forgotPassword.instruction.reset.topBadge.title",
        topBadgeData: {
            count: 3,
            keyPrefix: "forgotPassword.instruction.reset.topBadge.badgeTitle",
        },
    },
}

const route = useRoute()
const { t } = useI18n()

const currentPathname = computed(() => {
    const localeMatch = route.path.match(/^\/([a-z]{2})(\/|$)/)
    return localeMatch
        ? route.path.replace(/^\/[a-z]{2}/, '')
        : route.path
})

const instructionConfig = computed(() =>
    INSTRUCTION_CONFIG[currentPathname.value] ||
    INSTRUCTION_CONFIG[PATH.SIGNIN.path]
)

const topBadge = computed(() =>
    instructionConfig.value.topBadgeData
        ? Array.from({ length: instructionConfig.value.topBadgeData.count }).map((_, idx) => ({
            number: idx + 1,
            title: t(`${instructionConfig.value.topBadgeData?.keyPrefix}.${idx + 1}`),
        }))
        : []
)

const bottomBadge = computed(() =>
    instructionConfig.value.bottomBadgeData
        ? Array.from({ length: instructionConfig.value.bottomBadgeData.count }).map((_, idx) => ({
            number: idx + 1 + (instructionConfig.value.topBadgeData?.count || 0),
            title: t(`${instructionConfig.value.bottomBadgeData?.keyPrefix}.${idx + 1}`),
        }))
        : []
)
</script>

<template>
    <InstructionContainer :title="instructionConfig.title" :subTitle="instructionConfig.subTitle"
        :topBadgeTitleKey="instructionConfig.topBadgeTitleKey"
        :bottomBadgeTitleKey="instructionConfig.bottomBadgeTitleKey">
        <template #topBadge>
            <InstructionBadge :badges="topBadge" />
        </template>
        <template #bottomBadge>
            <InstructionBadge :badges="bottomBadge" />
        </template>
    </InstructionContainer>
</template>