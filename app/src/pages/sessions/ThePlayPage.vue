<script setup lang="ts">
  import JoinSession from '@/components/sessions/join/JoinSession.vue'
  import PlaySession from '@/components/sessions/play/PlaySession.vue'
  import PlayerState from '@/enums/PlayerState'
  import Session from '@/models/Session'
  import SetupSession from '@/components/sessions/setup/SetupSession.vue'
  import TheMainLayout from '@/layouts/TheMainLayout.vue'
  import { computed } from 'vue'
  import { onBeforeUnmount } from 'vue'
  import { useSessionStore } from '@/store/session'
  import { useSocketStore } from '@/store/socket'

  // Store
  const sessionStore = useSessionStore()
  const socketStore = useSocketStore()

   // Props
  const props = defineProps<{
    sessionId: string
  }>()

  // Computed
  const componentName = computed<string>(() => {
    const state = sessionStore.player?.state

    if (!state) {
      return JoinSession
    }

    if ([PlayerState.JOINED, PlayerState.READY].includes(state)) {
      return SetupSession
    }

    return PlaySession
  })

  // Lifecycle hooks
  onBeforeUnmount(() => {
    socketStore.socket.emit('exit')
    sessionStore.session = new Session({ id: 0, players: [] })
  })

  // Methods
  function initSession() {
    sessionStore.session.id = +props.sessionId
  }

  initSession()
</script>

<template>
  <the-main-layout>
    <component :is="componentName" />
  </the-main-layout>
</template>
