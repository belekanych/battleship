<script setup lang="ts">
  import PlaySession from '@/components/sessions/play/PlaySession.vue'
  import Session from '@/models/Session'
  import SetupSession from '@/components/sessions/setup/SetupSession.vue'
  import TheMainLayout from '@/layouts/TheMainLayout.vue'
  import { computed } from 'vue'
  import { onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSessionStore } from '@/store/session'
  import { useSocketStore } from '@/store/socket'

  // Router
  const router = useRouter()

  // Store
  const sessionStore = useSessionStore()
  const socketStore = useSocketStore()

   // Props
  const props = defineProps<{
    sessionId: string
  }>()

  // Computed
  const componentName = computed<string>(() => {
    if (!sessionStore.session.id) {
      return ''
    }

    return sessionStore.session.isReady() ? PlaySession : SetupSession
  })

  // Lifecycle hooks
  onBeforeUnmount(() => {
    socketStore.socket.emit('exit')
    sessionStore.session = new Session({ id: 0, players: [] })
  })

  // Methods
  function checkSession() {
    const sessionId = +props.sessionId

    if (sessionStore.session.id !== sessionId) {
      router.push({ name: 'sessions.join', params: { sessionId } })
    }
  }

  checkSession()
</script>

<template>
  <the-main-layout>
    <component :is="componentName" />
  </the-main-layout>
</template>
