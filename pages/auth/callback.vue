<script lang="ts" setup>
import { PATH, ROLE_MAP } from '~/config';
import { redirectByUserRole } from '~/lib'
import type { AccessLevelRole } from '~/types/types';
import type { UserInterface } from '~/types/types';
import type { AuthenticationResponse } from '~/types/types';
import type { ApiResponse } from '~/types/types';
import type { ApiResultModel } from '~/types/types';

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
    try {
        const result: ApiResponse<ApiResultModel<AuthenticationResponse>> =
            await verifySession();
        if (
            result &&
            result.data &&
            result.data.resultData &&
            result.data.isSuccess
        ) {
            const userRole: AccessLevelRole =
                result.data.resultData.accessLevelRole;
            const user: UserInterface = result.data.resultData.user;
            const currentUserRole: UserMainRole = ROLE_MAP[userRole] || "guest";

            authStore.setIsLoggedIn(true);
            authStore.setIsTokenValid(true);
            authStore.setCurrentUserRole(currentUserRole);
            authStore.setUser(result.data.resultData.user);

            redirectByUserRole(userRole, router, user.id);
        } else {
            // Fallback redirect if session is not valid
            authStore.setIsLoggedIn(false);
            authStore.setIsTokenValid(false);
            authStore.setCurrentUserRole("guest");
            router.push(PATH.SIGNIN.path);
        }
    } catch (error: unknown) {
        // Explicit redirect in case of error
        authStore.setIsLoggedIn(false);
        authStore.setIsTokenValid(false);
        authStore.setCurrentUserRole("guest");
        router.push(PATH.SIGNIN.path);
    }

});
</script>

<template>
    <main class="flex h-screen justify-center items-center cursor-progress">
        ...redirecting
    </main>
</template>