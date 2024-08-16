<template>
    <div class="flex">
        <div class="mt-4 w-1/5 hidden md:block">
            <AsideDesktop />
        </div>
        <div class="w-full">
            <h2 class="my-4 text-xl font-bold">Les posts récents :</h2>
            <div>
                <div class="relative">
                    <button @click="display(filterDiv)">Filtre</button>
                    <div ref="filterDiv" class="absolute bg-secondary px-4 py-2 border rounded-md hidden">
                        <p>Ajouter un filtre</p>
                        <form @submit.prevent="handleSubmit">
                            <div class="flex flex-wrap gap-4">
                                <div>
                                    <p>Date</p>
                                    <select name="date" id="date" class="text-background" v-model="date">
                                        <option value="new">Du plus récent</option>
                                        <option value="old">Du plus ancien</option>
                                    </select>
                                </div>
                                <div>
                                    <p>Catégorie</p>
                                    <select name="category" id="category" class="text-background" v-model="category">
                                        <option value="">Toutes les catégories</option>
                                        <option value="category1">Catégorie 1</option>
                                        <option value="category2">Catégorie 2</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit">Rechercher</button>
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
const date = ref('');
const category = ref('');

const { $api } = useNuxtApp();

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

const getCategories = async () => {
    
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
        sortedPosts = sortedPosts.filter(post => post.category === category.value);
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
});

</script>

<style>
/* Add your styles here */
</style>
