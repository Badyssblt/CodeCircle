<template>
    <div class="flex w-full">
        <div class="mt-4 hidden md:block w-1/5">
            <AsideDesktop/>
        </div>
        <div class="w-full">
            <div class="flex items-center md:w-2/3">
                <h2 class="font-bold text-xl w-full mt-2">Explorer les discussions</h2>
                <button class="px-6 py-2 bg-lemon text-background rounded-md mt-2 flex items-center ">
                    Post
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ml-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <div class="flex flex-col md:flex-row w-full gap-4 md:gap-20 items-center md:items-start">
            <div class="md:w-2/3 w-full">
                <Groups title="Développement Web">
                    <GroupsCard class="w-full md:w-[48%]" v-for="post in posts"/>
                </Groups>
            </div>
            <div class="mt-4">
                <RightAside/>
            </div>
        </div>
        </div>
        
        
        
    </div>
    
</template>

<script setup>
    const posts = ref([]);

    const getPosts = async () => {
        const response = await apiInstance.get('/post'); 
        posts.value = response.data;
            
    }

    onMounted(async () => {
        await getPosts();
    })


</script>

<style>

</style>