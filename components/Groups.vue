<template>
  <div class="bg-secondary py-2 px-4 rounded-md mt-4 w-full">
    <div class="flex justify-between items-center">
        <h2 class="text-slate-400 font-semibold mb-2">{{ title }}</h2>
        <button @click="reduce" v-if="isShow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-lemon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>
        </button>
        <button @click="expand" v-if="!isShow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-lemon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        </button>
        
    </div>
    <div class="flex flex-wrap gap-4" v-show="isShow">
        <slot />
    </div>
  </div>
</template>

<script setup>
    const props = defineProps({
        title: String
    })

    const isShow = ref(true);

    const reduce = () => {
        isShow.value = false;
    }

    const expand = () => {
        isShow.value = true;
    }


</script>

<style>

</style>