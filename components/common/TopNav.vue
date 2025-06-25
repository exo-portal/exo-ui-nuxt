<script setup lang="ts">
import { ChevronRight, LogOutIcon } from 'lucide-vue-next';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useRoute } from 'vue-router';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { formatRoleName } from '~/lib';
import type { AccessLevelRole } from '~/types/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Separator } from '../ui/separator';

const route = useRoute();

const router = useRouter();
const authStore = useAuthStore();

async function handleLogout() {
    authStore.reset();
    logoutUser().then(() => {
        router.push('/signin');
    });
};

const COUNTRY_OPTIONS = [
    { label: "English", displayValue: "EN", value: "en", icon: "/svg/national-flag/US.svg" },
    { label: "Français", displayValue: "FR", value: "fr", icon: "/svg/national-flag/FR.svg" },
    { label: "Tagalog", displayValue: "PH", value: "tl", icon: "/svg/national-flag/PH.svg" },
    { label: "日本語", displayValue: "JP", value: "ja", icon: "/svg/national-flag/JA.svg" },
];

// Language selector model
const { $i18n } = useNuxtApp();
const selectedLanguage = ref($i18n.locale.value || 'en');

// Computed property for selected option
const selectedOption = computed(() => {
    return COUNTRY_OPTIONS.find(option => option.value === selectedLanguage.value);
});

// Method to handle language change
const handleLanguageChange = (value: any) => {
    if (value && (value === 'en' || value === 'fr' || value === 'tl' || value === 'ja')) {
        selectedLanguage.value = value;
        $i18n.setLocale(value);
    }
};

const navLinks = [
    { name: 'Home', path: `${authStore.currentUserRole}/` },
    { name: 'About', path: `${authStore.currentUserRole}/about` },
    { name: 'Contact', path: `${authStore.currentUserRole}/contact` },
];
</script>

<template>
    <nav aria-label="Main navigation" class="sticky top-0 z-50 px-28 py-8">
        <div class="flex items-center justify-between">
            <a href="/" class="nav-logo" aria-label="Homepage">
                <!-- Replace with your logo image or SVG -->
                <div data-testid="company-logo" class="h-[50px] w-[120px] bg-neutral-50 rounded-lg"
                    aria-label="Company logo" role="img" />
            </a>
            <ul
                class="flex justify-between items-center space-x-4 bg-background-50 rounded-4xl py-2.5 px-4 shadow-[0_0_24px_0_rgba(0,0,0,0.10)]">
                <!-- Navigation Links -->
                <NuxtLink v-for="link in navLinks" :key="link.name"
                    class="text-background-400 text-body-normal px-4 py-2.5 rounded-full hover:bg-main-400 hover:text-background-50"
                    active-class="bg-main-500 text-white" :to="link.path">
                    {{ $t(`topNav.links.${link.name.toLowerCase()}`) }}
                </NuxtLink>
            </ul>
            <div
                class="flex items-center space-x-4 p-4 bg-background-50 rounded-4xl shadow-[0_0_24px_0_rgba(0,0,0,0.10)]">
                <!-- Notifications -->
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <img src="/svg/icons/bell.svg" alt="Notifications Icon" class="w-6 h-6 cursor-pointer" />
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
                            <img src="/svg/icons/settings.svg" alt="Settings Icon" class="w-6 h-6 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{{ $t('topNav.profile.settings') }}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div class="h-[40px] border-l-2" />

                <!-- Language Selector -->
                <Select v-model="selectedLanguage" @update:model-value="handleLanguageChange">
                    <SelectTrigger is-input-group class="w-[105px]">
                        <SelectValue>
                            <template #default>
                                <template v-if="selectedOption">
                                    <img v-if="selectedOption.icon" :src="selectedOption.icon"
                                        :alt="selectedOption.displayValue" class="inline-block w-5 h-5 mr-1" />
                                    <span class="text-neutral-400 text-body-normal">{{
                                        selectedOption.displayValue ||
                                        'EN'
                                    }}</span>
                                </template>
                                <template v-else>
                                    EN
                                </template>
                            </template>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel class="text-body-normal font-bold text-neutral-800 py-2.5 flex flex-col gap-2">
                                {{ $t('topNav.profile.selectALanguage') }}
                                <Separator />
                            </SelectLabel>
                            <SelectItem v-for="option in COUNTRY_OPTIONS" :key="option.value" :value="option.value"
                                class="cursor-pointer">
                                <template v-if="option.icon">
                                    <img :src="option.icon" :alt="option.label" class="inline-block w-5 h-5 mr-1" />
                                </template>
                                <span class="text-neutral-400 text-body-normal">{{ option.label }}</span>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>


                <!-- My Account Dropdown -->
                <DropdownMenu>
                    <DropdownMenuTrigger class="cursor-pointer">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <Avatar>
                                        <AvatarImage
                                            :src="authStore.user?.avatarUrl ? authStore.user?.avatarUrl : 'https://github.com/unovue.png'"
                                            :alt="`${authStore.user?.fullName} avatar`" />
                                        <AvatarFallback>{{ $t('topNav.profile.avatarFallback') }}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{{ $t('topNav.profile.myAccount') }}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <!-- User Profile -->
                        <DropdownMenuLabel as="div" class="p-2">
                            <NuxtLink :to="`${route.path}/profile`"
                                class="flex items-center space-x-4 cursor-pointer no-underline focus:outline-none"
                                aria-label="Go to profile">
                                <div class="flex flex-col">
                                    <h3 class="text-body-normal font-bold text-neutral-800">{{ authStore.user?.fullName
                                        }}</h3>
                                    <p class="text-body-small text-neutral-400">{{ authStore.user?.email }}</p>
                                </div>
                                <ChevronRight class="text-neutral-400" />
                            </NuxtLink>
                        </DropdownMenuLabel>

                        <!-- Divider -->
                        <DropdownMenuSeparator />
                        <!-- Theme Switcher -->
                        <div class="text-body-normal text-neutral-400 px-2 pt-2 font-normal">Theme</div>

                        <!-- Role Switcher -->
                        <Accordion v-if="authStore.roleNames && authStore.roleNames.length > 0" class="px-2"
                            type="single" collapsible>
                            <AccordionItem value="switch-role">
                                <AccordionTrigger class="cursor-pointer text-body-normal text-neutral-400 font-normal">
                                    {{ $t('topNav.profile.items.switchRole') }}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <template v-for="role in authStore.roleNames" :key="role">
                                        <DropdownMenuItem :disabled="role === authStore.accessLevelRole"
                                            :class="role === authStore.accessLevelRole ? 'text-main-500 disabled:opacity-100 disabled:text-main-500' : ''">
                                            {{ formatRoleName(role as AccessLevelRole) }}
                                        </DropdownMenuItem>
                                    </template>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <!-- Divider -->
                        <DropdownMenuSeparator />

                        <!-- Logout -->
                        <DropdownMenuItem class="flex gap-2 items-center" @click="handleLogout">
                            <LogOutIcon class="text-neutral-400" />
                            <span class="">
                                {{ $t('topNav.profile.items.logout') }}
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </nav>
</template>