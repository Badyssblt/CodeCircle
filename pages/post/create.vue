<template>
  <div>
    <form @submit.prevent="handleSubmit">
        <div>
            <Input label="Entrer le titre du post" v-model="title" />
        </div>
        <Editor v-model="content"/> 
        <Button class="mt-4" :state="loading">Créer</Button>
        <div v-if="state === 'success'">
            <p>Le post a bien été créer</p>
        </div>
    </form>
  </div>
</template>

<script setup>
    const title = ref('');
    const content = ref('');

    const state = ref('');
    const loading = ref(false);

    const { $api } = useNuxtApp();

    const handleSubmit = async () => {
        loading.value = true;
        try {
            const response = await $api.post('/post', {
                title: title.value,
                content: content.value,
                categoryId: 1,
                type: "post"
            });
            if(response.data){
                state.value = "success";
            }
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false;
        }
    }

</script>

<style scoped>
    
</style>