<template>
  <div
    role="alert"
    class="rounded-xl border  p-4 border-gray-800 bg-secondary"
  >
    <div class="flex items-start gap-4">
      <span class="text-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
  
      <div class="flex-1">
        <strong class="block font-medium text-gray-900 dark:text-white"> Succès </strong>
  
        <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">
          <slot/>
        </p>
      </div>

    </div>
  </div>
</template>