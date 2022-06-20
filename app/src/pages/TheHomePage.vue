<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center pb-16 bg-blue-900"
  >
    <h1 class="text-white font-extrabold text-6xl md:text-8xl my-8">
      Battleship
    </h1>
    <router-link
      :to="{ name: 'sessions.create' }"
      class="text-center bg-white text-blue-900 font-bold py-4 w-32 rounded-full hover:bg-blue-100 transition"
    >
      Play
    </router-link>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    /**
     * Component name.
     */
    name: 'TheHomePage',
  })
</script>
