<template>
    <div class="flex w-full">
        <Loader v-if="loading"/>
        <div class="mt-4 hidden md:block w-1/5">
            <AsideDesktop/>
        </div>
        <div class="w-full">
            <div class="flex items-center md:w-2/3">
                <h2 class="font-bold text-xl w-full mt-2">Explorer les discussions</h2>
                <NuxtLink to="/post/create" class="px-6 py-2 bg-lemon text-background rounded-md mt-2 flex items-center ">
                    Post
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ml-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </NuxtLink>
            </div>
            <div class="flex flex-col md:flex-row w-full gap-4 md:gap-20 items-center md:items-start">
                 <div v-if="posts.length == 0" class="md:w-2/3 w-full mt-4">
                    <p>Aucun post...</p>
                </div>
                <div class="flex flex-col md:w-2/3 w-full">
                    <div v-for="(posts, category) in limitedGroupedPosts" :key="category" class=" w-full">
                        <Groups :title="category">
                            <!-- Itération sur les posts de chaque catégorie -->
                            <GroupsCard
                            v-for="post in posts.slice(0, 4)"
                            :key="post.id"
                            :post="post"
                            class="w-full md:w-[48%]"
                            style="bg-background"
                            />
                        </Groups>
                    </div>
                </div>
                
            <div class="mt-4">
                <RightAside/>
            </div>
        </div>
        </div>
        
        
        
    </div>
    
</template>

<script setup>
    useHead({
        title: "Accueil"
    })
    const posts = ref([]);
    const loading = ref(false);

    const groupedPosts = ref({});

    const { $api } = useNuxtApp();

    const limitedGroupedPosts = computed(() => {
    const categories = Object.keys(groupedPosts.value);
    const limitedCategories = categories.slice(0, 4);
    return limitedCategories.reduce((acc, category) => {
        acc[category] = groupedPosts.value[category];
        return acc;
    }, {});
    });


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