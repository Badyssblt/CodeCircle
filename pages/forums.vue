<template>
    <div class="flex ">
        <div class="mt-4 w-1/5 hidden md:block">
            <AsideDesktop/>
        </div>
        <div class="w-full flex justify-center">
            <div class="flex flex-col w-full md:w-4/6 items-center gap-4">
                 <div v-if="posts.length == 0" class=" w-full mt-4">
                    <p>Aucun post...</p>
                </div>
                <div v-for="(posts, category) in groupedPosts" :key="category" class="w-full">
                <Groups :title="category">
                    <!-- Itération sur les posts de chaque catégorie -->
                    <GroupsCard
                    v-for="post in posts.slice(0, 4)"
                    :key="post.id"
                    :post="post"
                    class="w-full md:w-[48%]"
                    />
                </Groups>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    const posts = ref([]);
    const loading = ref(false);

    const groupedPosts = ref({});

    const { $api } = useNuxtApp();

    


    const getPosts = async () => {
        loading.value = true;
        try {
            const response = await $api.get('/post'); 
            posts.value = response.data;

            groupedPosts.value = posts.value.reduce((acc, post) => {
            const category = post.category.title;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(post);
            return acc;
        }, {});
        console.log(groupedPosts);
        } catch (error) {
            loading.value = false;
        }finally {
            loading.value = false;
        }
        

            
    }

    onMounted(async () => {
        await getPosts();
    })


</script>

<style>

</style>