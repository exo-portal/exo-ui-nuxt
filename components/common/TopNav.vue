<script setup lang="ts">
import { ChevronRight, LogOutIcon, Menu, X } from 'lucide-vue-next';
import ExoBrand from './ExoBrand.vue';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useRoute } from 'vue-router';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { formatRoleName, handleFetchError, redirectByUserRole } from '~/lib';
import type { AccessLevelRole, ApiErrorResponse, ApiResponse, ApiResultModel, AuthenticationResponse, UserInterface } from '~/types/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Separator } from '../ui/separator';
import { ROLE_MAP } from '~/config';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const errorStore = useErrorStore();
const { t } = useI18n();

const { $i18n } = useNuxtApp();
const selectedLanguage = ref($i18n.locale.value || 'en');

const COUNTRY_OPTIONS = [
    { label: "English", displayValue: "EN", value: "en", icon: "/svg/national-flag/US.svg" },
    { label: "Français", displayValue: "FR", value: "fr", icon: "/svg/national-flag/FR.svg" },
    { label: "Tagalog", displayValue: "PH", value: "tl", icon: "/svg/national-flag/PH.svg" },
    { label: "日本語", displayValue: "JP", value: "ja", icon: "/svg/national-flag/JA.svg" },
];

const selectedOption = computed(() =>
    COUNTRY_OPTIONS.find(o => o.value === selectedLanguage.value)
);

const navLinks = [
    { name: 'Home', path: `${authStore.currentUserRole}/` },
    { name: 'About', path: `${authStore.currentUserRole}/about` },
    { name: 'Contact', path: `${authStore.currentUserRole}/contact` },
];

const isMobileMenuOpen = ref(false);

async function handleLogout() {
    authStore.reset();
    logoutUser().then(() => router.push('/signin'));
}

const handleLanguageChange = (value: any) => {
    if (value && ['en', 'fr', 'tl', 'ja'].includes(value)) {
        selectedLanguage.value = value;
        $i18n.setLocale(value);
    }
};

const switchRoleApi = (newRole: string) => {
    switchRole(newRole)
        .then((response: ApiResponse<ApiResultModel<AuthenticationResponse>>) => {
            if (response.data?.isSuccess && response.data.resultData?.user) {
                const user: UserInterface = response.data.resultData.user;
                const userRole: AccessLevelRole = response.data.resultData.accessLevelRole;
                authStore.setUser(user);
                authStore.setRoleNames(response.data.resultData.roleNames || []);
                authStore.setFeatureKeys(response.data.resultData.featureKeys || []);
                authStore.setAccessLevelRole(userRole);
                const currentUserRole: UserMainRole = ROLE_MAP[userRole] || "guest";
                authStore.setCurrentUserRole(currentUserRole);
                redirectByUserRole(userRole, router, user.id);
            }
        })
        .catch((error: ApiErrorResponse) => {
            handleFetchError({ error, t, allowedFields: [], setErrorStore: errorStore.setError });
        });
};

/* Shared dropdown content to avoid duplication between desktop/mobile */
const avatarDropdownContent = computed(() => authStore.roleNames ?? []);
</script>

<template>
    <nav aria-label="Main navigation" class="sticky top-0 z-50 py-3 px-3 sm:px-4 md:px-6">

        <!-- ── Floating pill bar ───────────────────────────────────── -->
        <div
            class="max-w-screen-xl mx-auto bg-background-50/95 backdrop-blur-md border border-neutral-100 rounded-2xl px-3 py-2 flex items-center justify-between gap-3 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">

            <!-- Logo -->
            <NuxtLink to="/" class="shrink-0" aria-label="Homepage">
                <ExoBrand orientation="horizontal" size="sm" />
            </NuxtLink>

            <!-- Desktop nav links — centered -->
            <ul class="hidden md:flex items-center gap-0.5 flex-1 justify-center">
                <NuxtLink v-for="link in navLinks" :key="link.name"
                    class="text-neutral-500 text-body-normal font-medium px-3.5 py-2 rounded-full hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-150"
                    active-class="bg-main-50 text-main-600 font-semibold" :to="link.path">
                    {{ $t(`topNav.links.${link.name.toLowerCase()}`) }}
                </NuxtLink>
            </ul>

            <!-- Desktop right controls -->
            <div class="hidden md:flex items-center gap-0.5">
                <!-- Notification -->
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <button
                                class="p-2 rounded-full text-neutral-400 hover:text-main-500 hover:bg-main-50 transition-colors duration-150">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" :stroke-width="1.8" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent><p>{{ $t('topNav.profile.notifications') }}</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <!-- Settings -->
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <button
                                class="p-2 rounded-full text-neutral-400 hover:text-main-500 hover:bg-main-50 transition-colors duration-150">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" :stroke-width="1.8" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent><p>{{ $t('topNav.profile.settings') }}</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div class="w-px h-5 bg-neutral-200 mx-1" />

                <!-- Language — compact flag + code only -->
                <Select v-model="selectedLanguage" @update:model-value="handleLanguageChange">
                    <SelectTrigger
                        class="h-auto w-auto gap-1 border-0 bg-transparent shadow-none px-2.5 py-2 rounded-full hover:bg-neutral-100 focus:ring-0 transition-colors duration-150">
                        <SelectValue>
                            <template #default>
                                <div class="flex items-center gap-1.5" v-if="selectedOption">
                                    <img :src="selectedOption.icon" :alt="selectedOption.displayValue"
                                        class="w-4 h-4 rounded-sm object-cover" />
                                    <span class="text-body-small font-medium text-neutral-500">
                                        {{ selectedOption.displayValue }}
                                    </span>
                                </div>
                                <span v-else class="text-body-small font-medium text-neutral-500">EN</span>
                            </template>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel class="text-body-small font-semibold text-neutral-800 py-2 flex flex-col gap-2">
                                {{ $t('topNav.profile.selectALanguage') }}
                                <Separator />
                            </SelectLabel>
                            <SelectItem v-for="option in COUNTRY_OPTIONS" :key="option.value" :value="option.value"
                                class="cursor-pointer">
                                <div class="flex items-center gap-2">
                                    <img :src="option.icon" :alt="option.label"
                                        class="w-4 h-4 rounded-sm object-cover" />
                                    <span class="text-body-small text-neutral-600">{{ option.label }}</span>
                                </div>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div class="w-px h-5 bg-neutral-200 mx-1" />

                <!-- Avatar / profile dropdown -->
                <DropdownMenu>
                    <DropdownMenuTrigger class="cursor-pointer rounded-full outline-none ring-offset-1 focus-visible:ring-2 focus-visible:ring-main-400">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <Avatar class="w-9 h-9">
                                        <AvatarImage
                                            :src="authStore.user?.avatarUrl ?? 'https://github.com/unovue.png'"
                                            :alt="`${authStore.user?.fullName} avatar`" />
                                        <AvatarFallback class="text-caption">
                                            {{ $t('topNav.profile.avatarFallback') }}
                                        </AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent><p>{{ $t('topNav.profile.myAccount') }}</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-56">
                        <DropdownMenuLabel as="div" class="p-2">
                            <NuxtLink :to="`${route.path}/profile`"
                                class="flex items-center justify-between cursor-pointer no-underline"
                                aria-label="Go to profile">
                                <div class="flex flex-col min-w-0">
                                    <span class="text-body-small font-semibold text-neutral-800 truncate">
                                        {{ authStore.user?.fullName }}
                                    </span>
                                    <span class="text-caption text-neutral-400 truncate">
                                        {{ authStore.user?.email }}
                                    </span>
                                </div>
                                <ChevronRight class="w-4 h-4 text-neutral-400 shrink-0 ml-2" />
                            </NuxtLink>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div class="text-caption text-neutral-400 px-2 pt-1.5 pb-0.5 font-medium uppercase tracking-wide">
                            Theme
                        </div>
                        <Accordion v-if="avatarDropdownContent.length > 0" class="px-2" type="single" collapsible>
                            <AccordionItem value="switch-role" class="border-0">
                                <AccordionTrigger
                                    class="cursor-pointer text-body-small text-neutral-500 font-normal py-2">
                                    {{ $t('topNav.profile.items.switchRole') }}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <template v-for="role in avatarDropdownContent" :key="role">
                                        <DropdownMenuItem :disabled="role === authStore.accessLevelRole"
                                            :class="role === authStore.accessLevelRole ? 'text-main-500 disabled:opacity-100' : ''"
                                            @click="switchRoleApi(role)">
                                            {{ formatRoleName(role as AccessLevelRole) }}
                                        </DropdownMenuItem>
                                    </template>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="flex gap-2 items-center text-body-small" @click="handleLogout">
                            <LogOutIcon class="w-4 h-4 text-neutral-400" />
                            <span>{{ $t('topNav.profile.items.logout') }}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <!-- Mobile right: Avatar + Hamburger -->
            <div class="flex md:hidden items-center gap-2 ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger class="cursor-pointer rounded-full outline-none">
                        <Avatar class="w-8 h-8">
                            <AvatarImage :src="authStore.user?.avatarUrl ?? 'https://github.com/unovue.png'"
                                :alt="`${authStore.user?.fullName} avatar`" />
                            <AvatarFallback class="text-caption">
                                {{ $t('topNav.profile.avatarFallback') }}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-56">
                        <DropdownMenuLabel as="div" class="p-2">
                            <NuxtLink :to="`${route.path}/profile`"
                                class="flex items-center justify-between cursor-pointer no-underline"
                                aria-label="Go to profile">
                                <div class="flex flex-col min-w-0">
                                    <span class="text-body-small font-semibold text-neutral-800 truncate">
                                        {{ authStore.user?.fullName }}
                                    </span>
                                    <span class="text-caption text-neutral-400 truncate">
                                        {{ authStore.user?.email }}
                                    </span>
                                </div>
                                <ChevronRight class="w-4 h-4 text-neutral-400 shrink-0 ml-2" />
                            </NuxtLink>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Accordion v-if="avatarDropdownContent.length > 0" class="px-2" type="single" collapsible>
                            <AccordionItem value="switch-role" class="border-0">
                                <AccordionTrigger
                                    class="cursor-pointer text-body-small text-neutral-500 font-normal py-2">
                                    {{ $t('topNav.profile.items.switchRole') }}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <template v-for="role in avatarDropdownContent" :key="role">
                                        <DropdownMenuItem :disabled="role === authStore.accessLevelRole"
                                            :class="role === authStore.accessLevelRole ? 'text-main-500 disabled:opacity-100' : ''"
                                            @click="switchRoleApi(role)">
                                            {{ formatRoleName(role as AccessLevelRole) }}
                                        </DropdownMenuItem>
                                    </template>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="flex gap-2 items-center text-body-small" @click="handleLogout">
                            <LogOutIcon class="w-4 h-4 text-neutral-400" />
                            <span>{{ $t('topNav.profile.items.logout') }}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <!-- Hamburger -->
                <button @click="isMobileMenuOpen = !isMobileMenuOpen"
                    class="p-2 rounded-xl bg-neutral-100 hover:bg-main-50 border border-neutral-200 hover:border-main-200 transition-colors duration-150"
                    :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
                    :aria-expanded="isMobileMenuOpen">
                    <X v-if="isMobileMenuOpen" class="w-5 h-5 text-neutral-600" />
                    <Menu v-else class="w-5 h-5 text-neutral-600" />
                </button>
            </div>
        </div>
        <!-- ── /pill bar ───────────────────────────────────────────── -->

        <!-- Mobile slide-down panel (same max-width as pill) -->
        <Transition name="nav-slide">
            <div v-if="isMobileMenuOpen"
                class="md:hidden mt-2 max-w-screen-xl mx-auto bg-background-50/98 border border-neutral-100 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.09)] overflow-hidden">

                <!-- Nav links -->
                <div class="p-2 space-y-0.5">
                    <NuxtLink v-for="link in navLinks" :key="link.name" @click="isMobileMenuOpen = false"
                        class="flex items-center text-neutral-500 text-body-normal font-medium px-3 py-2.5 rounded-xl hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-150"
                        active-class="bg-main-50 text-main-600" :to="link.path">
                        {{ $t(`topNav.links.${link.name.toLowerCase()}`) }}
                    </NuxtLink>
                </div>

                <div class="h-px bg-neutral-100 mx-3" />

                <!-- Bottom row: icons + language -->
                <div class="flex items-center gap-0.5 px-2 py-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <button
                                    class="p-2.5 rounded-xl text-neutral-400 hover:text-main-500 hover:bg-main-50 transition-colors">
                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" :stroke-width="1.8" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                    </svg>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent><p>{{ $t('topNav.profile.notifications') }}</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <button
                                    class="p-2.5 rounded-xl text-neutral-400 hover:text-main-500 hover:bg-main-50 transition-colors">
                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" :stroke-width="1.8" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent><p>{{ $t('topNav.profile.settings') }}</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <div class="flex-1" />

                    <!-- Language (mobile) -->
                    <Select v-model="selectedLanguage" @update:model-value="handleLanguageChange">
                        <SelectTrigger
                            class="h-auto w-auto gap-1 border-0 bg-transparent shadow-none px-2.5 py-2 rounded-full hover:bg-neutral-100 focus:ring-0">
                            <SelectValue>
                                <template #default>
                                    <div class="flex items-center gap-1.5" v-if="selectedOption">
                                        <img :src="selectedOption.icon" :alt="selectedOption.displayValue"
                                            class="w-4 h-4 rounded-sm object-cover" />
                                        <span class="text-body-small font-medium text-neutral-500">
                                            {{ selectedOption.displayValue }}
                                        </span>
                                    </div>
                                    <span v-else class="text-body-small font-medium text-neutral-500">EN</span>
                                </template>
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel class="text-body-small font-semibold text-neutral-800 py-2 flex flex-col gap-2">
                                    {{ $t('topNav.profile.selectALanguage') }}
                                    <Separator />
                                </SelectLabel>
                                <SelectItem v-for="option in COUNTRY_OPTIONS" :key="option.value" :value="option.value"
                                    class="cursor-pointer">
                                    <div class="flex items-center gap-2">
                                        <img :src="option.icon" :alt="option.label"
                                            class="w-4 h-4 rounded-sm object-cover" />
                                        <span class="text-body-small text-neutral-600">{{ option.label }}</span>
                                    </div>
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<style scoped>
.nav-slide-enter-active,
.nav-slide-leave-active {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-slide-enter-from,
.nav-slide-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
