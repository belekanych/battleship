<script setup lang="ts">
  import TheMainLayout from '@/layouts/TheMainLayout.vue'
  import { useRouter } from 'vue-router'
  import { useSocketStore } from '@/store/socket'
  import Difficulty from '@/enums/Difficulty'

  const difficulties = {
    [Difficulty.EASY]: 'Easy',
    [Difficulty.NORMAL]: 'Normal',
    [Difficulty.HARD]: 'Hard',
  }

  // Router
  const router = useRouter()

  // Store
  const socketStore = useSocketStore()

  // Methods
  function create(difficulty: number = Difficulty.EASY) {
    socketStore.socket.emit('create.bot', difficulty, (sessionId: number) => {
      router.push({ name: 'sessions.join', params: { sessionId } })
    })
  }
</script>

<template>
  <the-main-layout>
    <div class="flex flex-col md:flex-row mt-4">
      <button
        v-for="(label, value) in difficulties"
        :key="value"
        type="button"
        class="text-center bg-white text-blue-900 font-bold py-2 px-6 m-2 rounded-full hover:bg-blue-100 transition"
        @click="create(value)"
      >
        {{ label }}
      </button>
    </div>
  </the-main-layout>
</template>
