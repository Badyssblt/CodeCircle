<template>
  <aside class="h-screen pr-14 mt-4 border-r">
    <div>
        <ProfileButton :class="selected === 'information' ? 'bg-secondary px-4 py-2 rounded-md' : ' '">Mes informations</ProfileButton>
    </div>
  </aside>
</template>

<script setup>
  defineProps({
    selected: {
      type: String,
      default: ""
    }
  })
</script>

<style>

</style>