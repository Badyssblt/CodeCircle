<template>
  <div class=" w-full md:w-1/2 md:mx-0 md:mx-auto mt-6 md:max-w-xl">
    <div class="px-4 py-6 rounded-md">
      <h2 class="font-bold text-lg md:text-xl text-center">S'inscrire</h2>
      <div>
        <form @submit.prevent="handleSubmit">
          <Input label="Nom" class="mb-4" placeholder="Entrer votre nom" v-model="name"/>
          <Input label="Email" class="mb-4" placeholder="Entrer votre email" v-model="email"/>
          <Input type="password" label="Mot de passe" placeholder="Entrer votre mot de passe" v-model="password"/>
          <div class="mt-4 flex justify-between items-center">
            <div class="flex justify-start">
              <Input type="checkbox" label="Se souvenir de moi" class="flex !flex-row-reverse gap-2"/>
            </div>
            <div>
              <NuxtLink to="/login">Déjà un compte ?</NuxtLink>
            </div>
          </div>
          <Button class="mt-4" :state="state">S'inscrire</Button>
        </form>
      </div>
    </div>
    
  </div>
</template>

<script setup>
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const state = ref(false);

useHead({
        title: "S'inscrire"
    })

  const { $api } = useNuxtApp();


  const handleSubmit = async () => {
    state.value = true;
    try {
      const response = await $api.post('/auth/register', {
        name: name.value,
        email: email.value,
        password: password.value
      });
      if(response.data){
        navigateTo('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }
</script>

<style>

</style>