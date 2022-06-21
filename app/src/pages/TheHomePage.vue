<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    /**
     * Component name.
     */
    name: 'TheHomePage',
  })
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center pb-16 bg-blue-900"
  >
    <h1 class="text-white font-extrabold text-6xl md:text-8xl my-12">
      Battleship
    </h1>
    <div class="flex flex-col md:flex-row">
      <router-link
        :to="{ name: 'sessions.create.friend' }"
        class="text-center bg-white text-blue-900 font-bold py-4 px-8 m-4 rounded-full hover:bg-blue-100 transition"
      >
        Play with a friend
      </router-link>
      <router-link
        :to="{ name: 'sessions.create.bot' }"
        class="text-center bg-white text-blue-900 font-bold py-4 px-8 m-4 rounded-full hover:bg-blue-100 transition"
      >
        Play with a bot
      </router-link>
    </div>
  </div>
</template>
