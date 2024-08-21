<template>
  <div class="flex">
    <ProfileAside class="flex-shrink-0" selected="information"/> <!-- L'aside prend seulement l'espace nécessaire -->
    <div class="flex gap-16 py-4 w-full justify-center">
      <div>
        <h2 class="font-medium text-lg">Mes informations</h2>
        <form @submit.prevent="handleSubmit">
          <Input label="Mon nom" v-model="name" />
          <Input label="Mon email" v-model="email" />
          <Input label="Mon mot de passe" v-model="password" />
          <Button class="mt-4">Changer mes informations</Button>
          <Warning v-if="error" class="mt-4">Votre mot de passe doit faire minimum 3 caractères</Warning>
        </form>
      </div>
      <div>
        <h2 class="font-medium text-lg">Changer d'image de profile</h2>
        <form @submit.prevent="uploadImage">
          <Input type="file" label="Image de profil" @change="handleFileChange" />
          <Button class="mt-4">Changer mon image de profile</Button>
          <Success v-if="uploadSuccess" class="mt-4">Votre photo de profil a bien été importé</Success>
          <Warning v-if="uploadError" class="mt-4">
            Le fichier est trop volumineux (Max: 1MB)<br/>
            Ton fichier : <span class="font-bold">{{ (imageFile.size / (1024 * 1024)).toFixed(1) }}</span> MB
            </Warning>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';


useHead({
        title: "Mon profil"
    })

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated());
const user = computed(() => userStore.getUser);

const name = ref('');
const email = ref('');
const password = ref('');
const imageFile = ref(null); 
const error = ref(false);
const uploadSuccess = ref(false);
const uploadError = ref(false);

const { $api } = useNuxtApp();

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    imageFile.value = files[0]; 
  }
};

const handleSubmit = async () => {
  try {
    if(password.value.length <= 3){
        error.value = true;
        console.log(error.value);
        return;
    }
    error.value = false;
    const response = await $api.patch('/user', {
        name: name.value,
        email: email.value,
        password: password.value
    });

    if(response.data.id){
        userStore.logout();
        navigateTo('/login');
    }

  } catch (error) {
    console.error(error);
  }
};

const uploadImage = async () => {
    if(imageFile.value == null){
      return;
    }
    const formData = new FormData();
    formData.append('image', imageFile.value);
    uploadError.value = false;
    uploadSuccess.value = false;
    try {
        const response = await $api.post('/user/upload', formData);
        uploadSuccess.value = true;
    } catch (error) {
        uploadError.value = true;
    }
}

const getUser = async () => {
  try {
    const response = await $api.get('/user/me');
    name.value = response.data.name;
    email.value = response.data.email;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getUser();
});
</script>

<style>
/* Ajoutez vos styles ici */
</style>
