<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useSocketStore } from '../../store/socket'

  // Router
  const router = useRouter()

  // Store
  const socketStore = useSocketStore()

  // Methods
  function create() {
    socketStore.socket.emit('create', null, (sessionId: number) => {
      router.push({ name: 'host.sessions.show', params: { sessionId } })
    })
  }

  create()
</script>

<template>Loading</template>
