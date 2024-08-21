<template>
  <div class=" w-full md:w-1/2 md:mx-0 md:mx-auto mt-6 md:max-w-xl">
    <div class="px-4 py-6 rounded-md">
      <h2 class="font-bold text-lg md:text-xl text-center">Connexion</h2>
      <div>
        <form @submit.prevent="handleSubmit">
          <Input label="Email" class="mb-4" placeholder="Entrer votre email" v-model="email"/>
          <Input type="password" label="Mot de passe" placeholder="Entrer votre mot de passe" v-model="password"/>
          <div class="mt-4 flex justify-between items-center">
            <div class="flex justify-start">
              <Input type="checkbox" label="Se souvenir de moi" class="flex !flex-row-reverse gap-2"/>
            </div>
            <div>
              <NuxtLink>Mot de passe oublié ?</NuxtLink>
            </div>
          </div>
          <Button class="mt-4" :state="state">Se connecter</Button>
        </form>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

  useHead({
        title: "Se connecter"
    })


  const state = ref(false);
  const email = ref('');
  const password = ref('');

  const { $api } = useNuxtApp();

  const handleSubmit = async () => {
    state.value = true;
    try {
      const response = await $api.post('/auth/login', {
        email: email.value,
        password: password.value
      });
      const token = useCookie('token');

      token.value = response.data.token;
      const userStore = useUserStore();
      userStore.setToken(token.value);   
      
      await navigateTo('/');
    } catch (error) {
      console.log(error);
    } finally {
      state.value = false;
    }
  }

</script>

<style>

</style>