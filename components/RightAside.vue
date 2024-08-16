<template>
  <div>
    <div class="flex gap-4">
        <button :class="{'underline underline-offset-4 font-bold': currentView === 'post', 'text-lemon': true}" @click="change('post')">Nouveaux posts</button>
        <button :class="{'underline underline-offset-4 font-bold': currentView === 'question', 'text-lemon': true}" @click="change('question')">Nouvelles questions</button>
    </div>
    <div class="flex flex-col mt-4" v-show="currentView === 'post'">
      <div v-for="post in filteredPosts" :key="post.id" class="flex items-center gap-4">
        <div>
          <div class="w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" alt="Tracking User Behavior" class="object-cover w-full h-full rounded-full">          </div>
        </div>
        <div>
          <h4>{{ post.title }}</h4>
          <p class="text-gray-600 text-sm"><time :datetime="$dayjs(post.created_at).utc().toISOString()">
    {{ $dayjs(post.created_at).utc().format('DD MMMM YYYY') }}
  </time></p>
        </div>
      </div>
    </div>
   <div class="flex flex-col mt-4" v-show="currentView === 'question'">
      <div v-for="question in filteredQuestions" :key="question.id" class="flex items-center gap-4">
        <div>
          <div class="w-10 h-10 flex items-center justify-center overflow-hidden">
                    <img src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" alt="Tracking User Behavior" class="object-cover w-full h-full rounded-full">
          </div>
        </div>
        <div>
          <h4>{{ question.title }}</h4>
          <p class="text-gray-600 text-sm"><time :datetime="$dayjs(question.created_at).utc().toISOString()">
    {{ $dayjs(question.created_at).utc().format('DD MMMM YYYY') }}
  </time></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    const currentView = ref('post');
    const posts = ref([]);

    const change = (param) => {
        currentView.value = param;
    }

    const filteredPosts = computed(() => {
    return posts.value.filter(item => item.type === 'post');
    });

    const filteredQuestions = computed(() => {
        return posts.value.filter(item => item.type === 'question');
    });

    const { $api } = useNuxtApp();

    const getPosts = async () => {
        try {
            const response = await $api.get('/post/last');
            posts.value = response.data;
        } catch (error) {
            console.log(error);
        }
    }

    onMounted(() => {
        getPosts();
    });
</script>

<style>

</style>