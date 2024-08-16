<template>
<NuxtLink :to="url">
  <div class="flex gap-4 hover:text-lemon hover:cursor-pointer transition-all">
      <slot />
    </div>
</NuxtLink>
  
</template>

<script setup>
  defineProps({
    url: {
      type: String,
      default: "/"
    }
  })
</script>

<style>

</style>