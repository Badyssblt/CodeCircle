<template>
  <div>
    <form @submit.prevent="handleSubmit">
        <div>
            <Input label="Entrer le titre du post" v-model="title" />
        </div>
        <div class="my-4 flex flex-col">
            <label for="category">Sélectionner un type de post</label>
            <select name="type" id="type" class="text-white bg-secondary border-none px-4 py-2 rounded-full" v-model="type">
                <option value="" selected disabled>Choisir un type</option>
                <option value="post">Post basique</option>
                <option value="answer">Question</option>
            </select>
        </div>
        <div class="my-4 flex flex-col">
            <label for="category">Sélectionner une catégorie</label>
            <select name="category" id="category" class="text-white bg-secondary border-none px-4 py-2 rounded-full" v-model="category">
                <option value="" selected disabled>Choisir une catégorie</option>
                <option :value="category.id" v-for="category in categories" >{{ category.title }}</option>
            </select>
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
    const type = ref('');
    const category = ref('');

    const state = ref('');
    const loading = ref(false);
    const categories = ref([]);

    const { $api } = useNuxtApp();

    const getCategory = async () => {
        try {
            const response = await $api.get('/category');
            categories.value = response.data;
            
        } catch (error) {
            console.log(erro);
            
        }
    }

    const handleSubmit = async () => {
        loading.value = true;
        
        try {
            const response = await $api.post('/post', {
                title: title.value,
                content: content.value,
                categoryId: category.value,
                type: type.value
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

    onMounted(() => {
        getCategory();
    })

</script>

<style scoped>
    
</style>