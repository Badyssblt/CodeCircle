<template>
    <div class="flex border-b border-slate-600 py-4 px-mobile items-center">
      <div class="flex-none flex items-center">
        <button class="md:hidden" @click="openMenu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
        </button>
          <nuxt-link to="/"><h1 class="font-bold hidden md:block">CodeCircle</h1></nuxt-link>
      </div>
      <div class="flex-grow px-2">
          <form @submit.prevent="search">
              <input v-model="query" type="text" placeholder="Rechercher" class="bg-background border w-full rounded-full pl-4 py-2">
          </form>
      </div>
      <div class="flex-none">
          <div class="flex flex-col gap-2 md:flex-row" v-if="!userStore.isAuthenticated">
              <NuxtLink to="/register" class="bg-lemon text-background rounded-md px-2 py-1 flex justify-center transition-all hover:bg-lemon/60">S'inscrire</NuxtLink>
              <NuxtLink to="/login" class="border border-lemon px-2 py-1 rounded-md">Se connecter</NuxtLink>
          </div>
          <div v-if="userStore.isAuthenticated" class="flex items-center gap-2">
                <button class="bg-lemon text-background rounded-md px-2 py-1 flex justify-center transition-all hover:bg-lemon/60" @click="logout">Se deconnecter</button>
                <NuxtLink><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </NuxtLink>
          </div>
      </div>
    </div>
    <Aside @close="close" :isShow="isShow"/>
</template>
  

<script setup>
import { useUserStore } from '@/stores/user';

    const userStore = useUserStore();
    const isAuthenticated = computed(() => userStore.isAuthenticated());
    const user = computed(() => userStore.getUser);
    const isShow = ref(false);


    const logout = async () => {
        userStore.logout();
        await navigateTo('/');
    }

    const close = () => {
        isShow.value = false;
    }

    const openMenu = () => {
        isShow.value = true;
    }

    const query = ref('');
    const router = useRouter();

    const search = () => {
        router.push({ path: '/search', query: { q: query.value }})
        query.value = "";
    }

</script>

<style>

</style>