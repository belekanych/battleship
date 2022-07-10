<script setup lang="ts">
  import Player from '@/models/Player'
  import PlayerType from '@/types/Player'
  import TheMainLayout from '@/layouts/TheMainLayout.vue'
  import type { Ref } from 'vue'
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSessionStore } from '@/store/session'
  import { useSocketStore } from '@/store/socket'

  // Router
  const router = useRouter()

  // Store
  const socketStore = useSocketStore()
  const sessionStore = useSessionStore()

  // Props
  const props = defineProps<{
    sessionId: string
  }>()

  // Data
  const name: Ref<string> = ref('')

  // Computed
  const isValid = computed<boolean>(() => !!name.value.length)

  // Methods
  function join(): void {
    const sessionId = +props.sessionId

    socketStore.socket.on('joined', (player: PlayerType) => {
      sessionStore.playerId = player.id
      sessionStore.session.id = sessionId
      sessionStore.session.addPlayer(new Player(player))

      router.push({ name: 'sessions.play', params: { sessionId } })
    })

    socketStore.socket.emit('join', {
      sessionId: sessionId,
      name: name.value,
    })
  }

  function onSubmit(): void {
    if (isValid) {
      join()
    }
  }
</script>

<template>
  <the-main-layout>
    <form class="flex flex-col items-center" @submit.prevent="onSubmit">
      <label class="flex flex-col mt-16">
        <span class="text-white">Your name:</span>
        <input
          v-model="name"
          type="text"
          class="border border-black py-1 px-2"
          autofocus
        />
      </label>
      <button
        :disabled="!isValid"
        type="submit"
        class="text-center bg-white text-blue-900 font-bold my-4 py-2 w-32 rounded-full hover:bg-blue-100 transition disabled:bg-gray-300"
      >
        Join
      </button>
    </form>
  </the-main-layout>
</template>
