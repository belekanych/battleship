<script setup lang="ts">
  import TheMainLayout from '@/layouts/TheMainLayout.vue'
  import { useRouter } from 'vue-router'
  import { useSocketStore } from '@/store/socket'

  // Router
  const router = useRouter()

  // Store
  const socketStore = useSocketStore()

  // Methods
  function create() {
    socketStore.socket.emit('create.friend', null, (sessionId: number) => {
      router.push({ name: 'sessions.show', params: { sessionId } })
    })
  }

  create()
</script>

<template>
  <the-main-layout>
    <p class="text-white">Loading...</p>
  </the-main-layout>
</template>
