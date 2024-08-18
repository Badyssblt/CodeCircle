<template>
    <div class="flex">
        <div class="mt-4 w-1/5 hidden md:block">
            <AsideDesktop />
        </div>
        <div class="w-full">
            <h2 class="my-4 text-xl font-bold">Les posts récents :</h2>
            <div>
                <div class="relative">
                    <button @click="display(filterDiv)" class="bg-lemon text-background px-8 py-2 rounded-md flex justify-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                        Filtre</button>
                    <div ref="filterDiv" class="absolute bg-secondary border border-gray-800 px-8 py-2 rounded-md hidden">
                        <p class="font-medium text-lg">Ajouter un filtre</p>
                        <form @submit.prevent="handleSubmit">
                            <div class="flex flex-wrap gap-4">
                                <div class="my-4 flex flex-col">
                                    <label for="date">Date</label>
                                    <select name="date" id="date" class="text-white bg-background border-none px-4 py-2 rounded-full" v-model="date">
                                        <option value="new" selected>Du plus récent</option>
                                        <option value="old">Du plus ancien</option>
                                    </select>
                                </div>
                                    <div class="my-4 flex flex-col">
                                        <label for="category">Sélectionner une catégorie</label>
                                        <select name="category" id="category" class="text-white bg-background border-none px-4 py-2 rounded-full" v-model="category">
                                            <option value="" selected disabled>Choisir une catégorie</option>
                                            <option :value="category.id" v-for="category in categories" >{{ category.title }}</option>
                                        </select>
                                    </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-col items-start">
                <div class="flex flex-col w-full md:w-4/6 items-center gap-4">
                    <div v-if="posts.length == 0" class="w-full mt-4">
                        <p>Aucun post...</p>
                    </div>
                    <GroupsCard v-for="post in filteredPosts" :key="post.id" :post="post" class="w-full bg-secondary" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const posts = ref([]);
const loading = ref(false);
const filterDiv = ref(null);
const date = ref('new');
const category = ref('');

const { $api } = useNuxtApp();

const categories = ref([]);

const getPosts = async () => {
    loading.value = true;
    try {
        const response = await $api.get('/post'); 
        posts.value = response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        loading.value = false;
    }
};



const getCategory = async () => {
        try {
            const response = await $api.get('/category');
            categories.value = response.data;
            
        } catch (error) {
            console.log(erro);
            
        }
    }

const handleSubmit = async () => {
    await getPosts();
};

const display = (refName) => {
    refName.classList.toggle('hidden');
};

const filteredPosts = computed(() => {
    let sortedPosts = [...posts.value];

    if (category.value) {
        sortedPosts = sortedPosts.filter(post => post.categoryId === category.value);
    }

    sortedPosts.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return date.value === 'new' ? dateB - dateA : dateA - dateB;
    });

    return sortedPosts;
});

onMounted(async () => {
    await getPosts();
    await getCategory();
});

</script>

<style>
/* Add your styles here */
</style>
