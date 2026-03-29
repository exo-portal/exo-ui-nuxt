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
    { label: "English", displayValue: "US", value: "en", icon: "/svg/national-flag/US.svg" },
    { label: "Français", displayValue: "FR", value: "fr", icon: "/svg/national-flag/FR.svg" },
    { label: "Tagalog", displayValue: "PH", value: "tl", icon: "/svg/national-flag/PH.svg" },
    { label: "日本語", displayValue: "JP", value: "ja", icon: "/svg/national-flag/JA.svg" },
];

const selectedOption = computed(() => {
    return COUNTRY_OPTIONS.find(option => option.value === selectedLanguage.value);
});

const navLinks = [
    { name: 'Home', path: `${authStore.currentUserRole}/` },
    { name: 'About', path: `${authStore.currentUserRole}/about` },
    { name: 'Contact', path: `${authStore.currentUserRole}/contact` },
];

const isMobileMenuOpen = ref(false);

async function handleLogout() {
    authStore.reset();
    logoutUser().then(() => {
        router.push('/signin');
    });
}

const handleLanguageChange = (value: any) => {
    if (value && (value === 'en' || value === 'fr' || value === 'tl' || value === 'ja')) {
        selectedLanguage.value = value;
        $i18n.setLocale(value);
    }
};

const switchRoleApi = (newRole: string) => {
    switchRole(newRole).then((response: ApiResponse<ApiResultModel<AuthenticationResponse>>) => {
        if (response.data && response.data.isSuccess && response.data.resultData && response.data.resultData.user) {
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
    }).catch((error: ApiErrorResponse) => {
        handleFetchError({
            error: error,
            t: t,
            allowedFields: [],
            setErrorStore: errorStore.setError,
        });
    });
}
</script>

<template>
    <nav aria-label="Main navigation"
        class="sticky top-0 z-50 app-container pt-4 md:pt-8 pb-4 bg-background-50/90 backdrop-blur-sm border-b border-neutral-100/60">
        <div class="flex items-center justify-between gap-4">

            <!-- Logo -->
            <NuxtLink to="/" class="shrink-0" aria-label="Homepage">
                <ExoBrand orientation="horizontal" size="sm" />
            </NuxtLink>

            <!-- Desktop Nav links — visible md+ -->
            <ul class="hidden md:flex justify-between items-center bg-background-50 rounded-4xl py-2 px-4 shadow-[0_0_24px_0_rgba(0,0,0,0.08)]">
                <NuxtLink v-for="link in navLinks" :key="link.name"
                    class="text-background-400 text-body-normal px-6 py-4 rounded-full hover:bg-main-400 hover:text-background-50 transition-colors duration-200"
                    active-class="bg-main-500 text-white" :to="link.path">
                    {{ $t(`topNav.links.${link.name.toLowerCase()}`) }}
                </NuxtLink>
            </ul>

            <!-- Desktop right section — visible md+ -->
            <div
                class="hidden md:flex items-center space-x-3 p-2 bg-background-50 rounded-4xl shadow-[0_0_24px_0_rgba(0,0,0,0.08)]">
                <!-- Notifications -->
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <button
                                class="p-2 rounded-full hover:bg-main-50 transition-colors duration-200">
                                <svg class="stroke-neutral-300 hover:stroke-main-500 w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    :stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{{ $t('topNav.profile.notifications') }}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <!-- Settings -->
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <button
                                class="p-2 rounded-full hover:bg-main-50 transition-colors duration-200">
                                <svg class="stroke-neutral-300 hover:stroke-main-500 w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    :stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{{ $t('topNav.profile.settings') }}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div class="h-[32px] border-l border-neutral-200" />

                <!-- Language Selector -->
                <Select v-model="selectedLanguage" @update:model-value="handleLanguageChange">
                    <SelectTrigger
                        class="w-[100px] bg-background-50 border-0 shadow-none group hover:bg-main-400 focus:bg-main-500 transition-colors duration-200">
                        <SelectValue>
                            <template #default>
                                <template v-if="selectedOption">
                                    <img v-if="selectedOption.icon" :src="selectedOption.icon"
                                        :alt="selectedOption.displayValue" class="inline-block w-4 h-4 mr-1" />
                                    <span
                                        class="text-neutral-400 text-body-small group-hover:text-background-50">
                                        {{ selectedOption.displayValue || 'EN' }}
                                    </span>
                                </template>
                                <template v-else>EN</template>
                            </template>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel
                                class="text-body-normal font-bold text-neutral-800 py-2.5 flex flex-col gap-2">
                                {{ $t('topNav.profile.selectALanguage') }}
                                <Separator />
                            </SelectLabel>
                            <SelectItem v-for="option in COUNTRY_OPTIONS" :key="option.value"
                                :value="option.value" class="cursor-pointer">
                                <template v-if="option.icon">
                                    <img :src="option.icon" :alt="option.label"
                                        class="inline-block w-4 h-4 mr-1" />
                                </template>
                                <span class="text-neutral-400 text-body-normal">{{ option.label }}</span>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <!-- Avatar dropdown -->
                <DropdownMenu>
                    <DropdownMenuTrigger class="cursor-pointer">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <Avatar>
                                        <AvatarImage
                                            :src="authStore.user?.avatarUrl ? authStore.user?.avatarUrl : 'https://github.com/unovue.png'"
                                            :alt="`${authStore.user?.fullName} avatar`" />
                                        <AvatarFallback>{{ $t('topNav.profile.avatarFallback')
                                            }}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{{ $t('topNav.profile.myAccount') }}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel as="div" class="p-2">
                            <NuxtLink :to="`${route.path}/profile`"
                                class="flex items-center space-x-4 cursor-pointer no-underline focus:outline-none"
                                aria-label="Go to profile">
                                <div class="flex flex-col">
                                    <h3 class="text-body-normal font-bold text-neutral-800">
                                        {{ authStore.user?.fullName }}</h3>
                                    <p class="text-body-small text-neutral-400">{{ authStore.user?.email }}</p>
                                </div>
                                <ChevronRight class="text-neutral-400" />
                            </NuxtLink>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div class="text-body-normal text-neutral-400 px-2 pt-2 font-normal">Theme</div>
                        <Accordion v-if="authStore.roleNames && authStore.roleNames.length > 0" class="px-2"
                            type="single" collapsible>
                            <AccordionItem value="switch-role">
                                <AccordionTrigger
                                    class="cursor-pointer text-body-normal text-neutral-400 font-normal">
                                    {{ $t('topNav.profile.items.switchRole') }}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <template v-for="role in authStore.roleNames" :key="role">
                                        <DropdownMenuItem :disabled="role === authStore.accessLevelRole"
                                            :class="role === authStore.accessLevelRole ? 'text-main-500 disabled:opacity-100 disabled:text-main-500' : ''"
                                            @click="switchRoleApi(role)">
                                            {{ formatRoleName(role as AccessLevelRole) }}
                                        </DropdownMenuItem>
                                    </template>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="flex gap-2 items-center" @click="handleLogout">
                            <LogOutIcon class="text-neutral-400" />
                            <span>{{ $t('topNav.profile.items.logout') }}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <!-- Mobile right: Avatar + Hamburger — visible below md -->
            <div class="flex md:hidden items-center gap-2">
                <!-- Compact avatar with dropdown -->
                <DropdownMenu>
                    <DropdownMenuTrigger class="cursor-pointer">
                        <Avatar class="w-8 h-8">
                            <AvatarImage
                                :src="authStore.user?.avatarUrl ? authStore.user?.avatarUrl : 'https://github.com/unovue.png'"
                                :alt="`${authStore.user?.fullName} avatar`" />
                            <AvatarFallback>{{ $t('topNav.profile.avatarFallback') }}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel as="div" class="p-2">
                            <NuxtLink :to="`${route.path}/profile`"
                                class="flex items-center gap-3 cursor-pointer no-underline focus:outline-none"
                                aria-label="Go to profile">
                                <div class="flex flex-col">
                                    <h3 class="text-body-normal font-bold text-neutral-800">
                                        {{ authStore.user?.fullName }}</h3>
                                    <p class="text-body-small text-neutral-400">{{ authStore.user?.email }}</p>
                                </div>
                                <ChevronRight class="text-neutral-400 shrink-0" />
                            </NuxtLink>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Accordion v-if="authStore.roleNames && authStore.roleNames.length > 0" class="px-2"
                            type="single" collapsible>
                            <AccordionItem value="switch-role">
                                <AccordionTrigger
                                    class="cursor-pointer text-body-normal text-neutral-400 font-normal">
                                    {{ $t('topNav.profile.items.switchRole') }}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <template v-for="role in authStore.roleNames" :key="role">
                                        <DropdownMenuItem :disabled="role === authStore.accessLevelRole"
                                            :class="role === authStore.accessLevelRole ? 'text-main-500 disabled:opacity-100 disabled:text-main-500' : ''"
                                            @click="switchRoleApi(role)">
                                            {{ formatRoleName(role as AccessLevelRole) }}
                                        </DropdownMenuItem>
                                    </template>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="flex gap-2 items-center" @click="handleLogout">
                            <LogOutIcon class="text-neutral-400" />
                            <span>{{ $t('topNav.profile.items.logout') }}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <!-- Hamburger toggle -->
                <button @click="isMobileMenuOpen = !isMobileMenuOpen"
                    class="p-2 rounded-xl bg-background-50 border border-neutral-200 hover:bg-main-50 hover:border-main-200 transition-colors duration-200 shadow-sm"
                    :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
                    :aria-expanded="isMobileMenuOpen">
                    <X v-if="isMobileMenuOpen" class="w-4 h-4 text-neutral-700" />
                    <Menu v-else class="w-4 h-4 text-neutral-700" />
                </button>
            </div>
        </div>

        <!-- Mobile slide-down panel -->
        <Transition name="nav-slide">
            <div v-if="isMobileMenuOpen"
                class="md:hidden mt-3 bg-background-50 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.10)] overflow-hidden border border-neutral-100">

                <!-- Nav links -->
                <div class="p-3 space-y-1">
                    <NuxtLink v-for="link in navLinks" :key="link.name" @click="isMobileMenuOpen = false"
                        class="flex items-center text-background-500 text-body-normal px-4 py-3 rounded-xl hover:bg-main-50 hover:text-main-600 transition-colors duration-150"
                        active-class="bg-main-500 text-white" :to="link.path">
                        {{ $t(`topNav.links.${link.name.toLowerCase()}`) }}
                    </NuxtLink>
                </div>

                <div class="h-px bg-neutral-100 mx-3" />

                <!-- Actions row: notifications, settings, language -->
                <div class="flex items-center gap-1 p-3">
                    <!-- Notifications -->
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <button class="p-2 rounded-xl hover:bg-main-50 transition-colors duration-200">
                                    <svg class="stroke-neutral-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24" :stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                    </svg>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{{ $t('topNav.profile.notifications') }}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <!-- Settings -->
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <button class="p-2 rounded-xl hover:bg-main-50 transition-colors duration-200">
                                    <svg class="stroke-neutral-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24" :stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{{ $t('topNav.profile.settings') }}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <div class="flex-1" />

                    <!-- Language Selector (mobile) -->
                    <Select v-model="selectedLanguage" @update:model-value="handleLanguageChange">
                        <SelectTrigger
                            class="w-[88px] bg-transparent border-0 shadow-none hover:bg-main-50 transition-colors duration-200">
                            <SelectValue>
                                <template #default>
                                    <template v-if="selectedOption">
                                        <img v-if="selectedOption.icon" :src="selectedOption.icon"
                                            :alt="selectedOption.displayValue" class="inline-block w-4 h-4 mr-1" />
                                        <span class="text-neutral-400 text-body-small">
                                            {{ selectedOption.displayValue || 'EN' }}
                                        </span>
                                    </template>
                                    <template v-else>EN</template>
                                </template>
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel
                                    class="text-body-normal font-bold text-neutral-800 py-2.5 flex flex-col gap-2">
                                    {{ $t('topNav.profile.selectALanguage') }}
                                    <Separator />
                                </SelectLabel>
                                <SelectItem v-for="option in COUNTRY_OPTIONS" :key="option.value"
                                    :value="option.value" class="cursor-pointer">
                                    <template v-if="option.icon">
                                        <img :src="option.icon" :alt="option.label"
                                            class="inline-block w-4 h-4 mr-1" />
                                    </template>
                                    <span class="text-neutral-400 text-body-normal">{{ option.label }}</span>
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
    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-slide-enter-from,
.nav-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
