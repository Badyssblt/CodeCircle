<template>
  <label class="flex flex-col">
        {{ label }}
    <input :type="type" v-model="model" class="text-white px-4 py-2 rounded-md focus:outline-none bg-secondary" :placeholder="placeholder">
  </label>
</template>

<script setup>

    const model = defineModel();


    defineProps({
        label: String,
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: ""
        },
    })
</script>

<style>

</style>