<template>
  <div
    role="alert"
    class="rounded border-s-4 border-red-500 bg-red-50 p-4 dark:border-red-600 dark:bg-red-900"
  >
    <strong class="block font-medium text-red-800 dark:text-red-100"> Oups! Une erreur est survenue </strong>
  
    <p class="mt-2 text-sm text-red-700 dark:text-red-200">
      <slot/>
    </p>
  </div>
</template>


