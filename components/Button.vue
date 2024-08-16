<template>
    <button class="bg-lemon w-full px-4 py-2 text-background rounded-md flex justify-center items-center gap-2 transition-all hover:bg-lemon/60">
        <slot/>
        <ButtonLoader v-if="state"/>
    </button>
</template>

<script setup>
    defineProps({
        state: {
            type: Boolean,
            default: false
        }
    })
</script>

<style>

</style>