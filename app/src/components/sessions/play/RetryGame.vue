<script setup lang="ts">
  import { computed } from 'vue'
  import { useSessionStore } from '@/store/session'
  import { useSocketStore } from '@/store/socket'

  // Store
  const sessionStore = useSessionStore()
  const socketStore = useSocketStore()

  // Computed
  const enabled = computed<boolean>(() => sessionStore.session.isCompleted())

  // Methods
  function retry(): void {
    socketStore.socket.emit('retry')
  }
</script>

<template>
  <button
    v-if="enabled"
    type="button"
    class="text-center bg-white text-blue-900 font-bold my-4 py-2 w-32 rounded-full hover:bg-blue-100 transition disabled:bg-gray-300"
    @click="retry"
  >
    Retry
  </button>
</template>
