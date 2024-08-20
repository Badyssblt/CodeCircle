<template>
    <div class="px-mobile flex">
        <Loader v-if="loading"/>
        <div class="mt-4 hidden md:block w-1/5">
            <AsideDesktop/>
        </div>
        <div class="mt-4 flex-1 overflow-hidden"  v-if="post && Object.keys(post).length !== 0">
            <div class="max-w-full mx-auto p-4">
                <h1 class="text-xl">{{ post.title }}</h1>
                <div>
                    <div class="flex items-center gap-4 mt-2">
                        <div class="w-10 h-10 flex items-center justify-center overflow-hidden">
                            <img :src="$config.public.SERVER_URL + '/images/' + post.author.imageName" alt="Tracking User Behavior" class="object-cover w-full h-full rounded-full">
                        </div>
                        <div>
                            <h2>{{ post.author.name }}</h2>
                            <p>Créer le <span class="text-slate-400"><time :datetime="$dayjs(post.created_at).utc().toISOString()">
                                {{ $dayjs(post.created_at).utc().format('DD MMMM YYYY') }}
                            </time></span>
                            </p>
                        </div>
                    </div> 
                </div>
                <div v-html="post.content" class="max-w-full overflow-x-auto mt-4">
                </div>
            </div>
            <div class="max-w-full mx-auto p-4" v-for="answer in post.answers">
                <div>
                    <div class="flex items-center gap-4 mt-2">
                        <div class="w-10 h-10 flex items-center justify-center overflow-hidden">
                            <img src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" alt="Tracking User Behavior" class="object-cover w-full h-full rounded-full">
                        </div>
                        <div>
                            <h2>{{ answer.author.name }}</h2>
                        </div>
                    </div> 
                </div>
                <div v-html="answer.content" class="max-w-full overflow-x-auto mt-4">
                </div>
            </div>
            <div class="border-t py-2 mt-4">
                <h2 class="text-xl">Répondre</h2>
                <form @submit.prevent="handleSubmit">
                    <div>
                        <Editor v-model="answer"/>
                    </div>
                    <Button class="mt-2" :state="state === 'loading' ? true : false">Répondre</Button>
                    <div v-if="state">
                        <p>{{ state }}</p>
                    </div>
                </form>
                
            </div>
        </div>

    </div>
</template>



<script setup>
import { onMounted } from "vue";

import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
const answer = ref(''); 

dayjs.locale('fr')

    const route = useRoute();

    const id = ref(parseInt(route.params.id));
    const post = ref({});
    const loading = ref(false);
    const state = ref('');

    const { $api } = useNuxtApp();

    const getPost = async () => {
        loading.value = true;
        try {
            const response = await $api.get('/post/' + id.value);
            post.value = response.data
            await nextTick();
        } catch (error) {
            loading.value = false
            if (error.response && error.response.status === 404) {
            navigateTo('/'); 
            }
        }finally {
            loading.value = false;
        }
    }

    const handleSubmit = async () => {
        state.value = "loading";
        try {
            const response = await $api.post('/post/' + id.value + '/answer', {
                content: answer.value
            });
            if(response.data){
                state.value = "Merci pour votre réponse !"
            }
            await getPost();
        } catch (error) {
            if(error.response.status == 401){
                console.log("test");
                navigateTo('/login');
            }
        }finally {
            state.value = "";
        }
    }

    const highlightCode = async () => {
    const blocks = document.querySelectorAll('pre code');

    // Apply highlight.js to all code blocks
    blocks.forEach(block => {
        hljs.highlightElement(block);
    });

    blocks.forEach(block => {
        block.classList.add('rounded-md')
    });

}



    onMounted(async () => {
        await getPost();
        await highlightCode();
    })

</script>

<style scoped>

    code {
        border-radius: 10px !important;
    }

</style>