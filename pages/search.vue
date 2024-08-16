<template>
<Loader v-if="posts.length === 0"/>
<div class="px-mobile">
    <h2 class="text-xl mt-4">Résultat:</h2>
    <GroupsCard v-for="post in filteredPost" :post="post" class="bg-secondary"/>
    <p v-if="filteredPost.length == 0">Aucun résultat...</p>
</div>
</template>

<script setup>
    const route = useRoute();
    const posts = ref([]);

    const { $api } = useNuxtApp();

    const getPosts = async () => {
        const response = await $api.get('/post'); 
        posts.value = response.data;         
    }

    const filteredPost = computed(() => {
        const query = route.query.q?.toLowerCase() || '';
        return posts.value.filter(post => post.title.toLowerCase().includes(query));
    })

    onMounted(() => {
        getPosts();
    })
</script>

<style>

</style>