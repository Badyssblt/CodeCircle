<template>
    <div>
        <h2 class="font-bold text-lg md:text-xl my-2">Suivez des utilisateurs</h2>
        <div class="flex flex-col">
            <div class="bg-secondary w-full px-4 py-2 rounded-md flex  gap-4 items-center" v-for="user in users">
                <div class="w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img :src="'http://localhost:5000/images/' + user.imageName" alt="Tracking User Behavior" class="object-cover w-full h-full rounded-full">
                </div>
                <div class="flex items-center gap-4">
                    <h3>{{ user.name }}</h3>
                    <button class="bg-lemon px-6 py-1 text-background rounded-full" @click="followUser(user.id)">Suivre</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>

    const users = ref([]);

    const { $api } = useNuxtApp();

    const getUsers = async () => {
        try {
            const response = await $api.get('/user');
            users.value = response.data            
        } catch (error) {
            console.log(error);
        }
    }

    const followUser = async (userId) => {
        console.log(userId);
        
        try {
            const response = await $api.post('/user/follow', {
                userId: userId
            })
        } catch (error) {
            
        }
    }

    onMounted(() => {
        getUsers()
    })
</script>

<style>

</style>