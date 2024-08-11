<template>
    <div class="flex border-b border-slate-600 py-4 px-mobile items-center">
      <div class="flex-none flex items-center">
        <button class="md:hidden" @click="openMenu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
        </button>
          <h1 class="font-bold hidden md:block">CodeCircle</h1>
      </div>
      <div class="flex-grow px-2">
          <form>
              <input type="text" placeholder="Rechercher" class="bg-background border w-full rounded-full pl-4 py-2">
          </form>
      </div>
      <div class="flex-none">
          <div class="flex flex-col gap-2 md:flex-row">
              <NuxtLink to="/register" class="bg-lemon text-background rounded-md px-2 py-1 flex justify-center">S'inscrire</NuxtLink>
              <NuxtLink to="/login" class="border border-lemon px-2 py-1 rounded-md">Se connecter</NuxtLink>
          </div>
      </div>
    </div>
    <Aside @close="close" :isShow="isShow"/>
</template>
  

<script setup>

    const isShow = ref(false);

    const close = () => {
        isShow.value = false;
    }

    const openMenu = () => {
        isShow.value = true;
    }

</script>

<style>

</style>