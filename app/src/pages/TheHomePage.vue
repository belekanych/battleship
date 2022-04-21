<template>
  <div class="min-h-screen flex flex-col justify-center items-center pb-16">
    <h1 class="text-black font-extrabold text-6xl md:text-8xl my-8">
      Battleship
    </h1>
    <router-link
      :to="{ name: 'host.sessions.create' }"
      class="text-center bg-black text-white font-bold py-4 w-32 rounded-full hover:bg-blue-900 transition"
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