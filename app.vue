<template>
  <div class="bg-background text-white min-h-screen text-sm md:text-base">
    <Header/>
    <NuxtPage class="px-mobile"/>
  </div>
</template>

<script setup>
  import Header from "./components/Header.vue"
</script>

<style>
  body {
    font-family: "DM Sans", sans-serif;
  }
</style>


