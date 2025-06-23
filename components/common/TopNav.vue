<script setup lang="ts">
import { ChevronRight, LogOutIcon } from 'lucide-vue-next';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useRoute } from 'vue-router';

const route = useRoute();

const router = useRouter();

async function handleLogout() {
    logoutUser().then(() => {
        router.push('/signin');
    }).catch((error) => {
    });
}
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
                class="flex justify-between items-center space-x-4 bg-white rounded-4xl py-2.5 px-4 shadow-[0_0_24px_0_rgba(0,0,0,0.10)]">
                <li class="px-10 py-4 rounded-2xl bg-main-500"><a class="text-neutral-50 font-bold text-body-normal"
                        href="/">Home</a></li>
                <li class="px-10 py-4"><a class="text-neutral-300 text-body-normal" href="/about">Home</a></li>
                <li class="px-10 py-4"><a class="text-neutral-300 text-body-normal" href="/contact">Home</a></li>
            </ul>
            <div class="flex items-center space-x-4 p-4  bg-white rounded-4xl shadow-[0_0_24px_0_rgba(0,0,0,0.10)]">
                <div class="">Notification</div>
                <div class="h-[40px] border-l-2"></div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel as="div" class="p-2">
                            <NuxtLink :to="`${route.path}/profile`"
                                class="flex items-center space-x-4 cursor-pointer no-underline focus:outline-none"
                                aria-label="Go to profile">
                                <div class="flex flex-col">
                                    <h3 class="text-body-normal font-bold text-neutral-800">Rochenette Legaspina</h3>
                                    <p class="text-body-small text-neutral-400">rochenette@gmail.com</p>
                                </div>
                                <ChevronRight class="text-neutral-400" />
                            </NuxtLink>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="flex gap-2 items-center" @click="handleLogout">
                            <LogOutIcon class="text-neutral-400" />
                            <span class="text-neutral-400 text-body-normal">
                                Logout
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </nav>
</template>