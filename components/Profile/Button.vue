<template>
  <NuxtLink :to="url">
    <slot/>
  </NuxtLink>
</template>

<script setup>
    defineProps({
        url: {
            type: String,
            default: "/profile"
        }
    })
</script>

<style>

</style>