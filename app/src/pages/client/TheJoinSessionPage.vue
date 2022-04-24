<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import TheMainLayout from '../../layouts/TheMainLayout.vue'
import { useRouter } from 'vue-router'
import { useSocketStore } from '../../store/socket'
import { useSessionStore } from '../../store/session'
import Player from '../../models/Player'
import User from '../../models/User'

// Router
const router = useRouter()

// Store
const socketStore = useSocketStore()
const sessionStore = useSessionStore()

// Props
const props = defineProps<{
  sessionId: string,
}>()

// Data
const name: Ref<string> = ref('');

// Computed
const isValid = computed<boolean>(() => !!name.value.length)

// Methods
async function join(): Promise<void>
{
  return new Promise(resolve => {
    const sessionId: number = +props.sessionId

    socketStore.socket.on('joined', player => {
      sessionStore.session.id = sessionId
      sessionStore.session.addPlayer(
        new Player(
          new User(player.user.name),
          player.field
        )
      )

      router.push({ name: 'client.sessions.setup' })

      resolve()
    })

    socketStore.socket.emit('join', {
      sessionId,
      name: name.value,
    })
  })
}

async function onSubmit (): Promise<void> {
  if (!isValid) {
    return
  }

  return await join()
}
</script>

<template>
  <the-main-layout>
    <form
      class="flex flex-col items-center"
      @submit.prevent="onSubmit"
    >
      <label class="flex flex-col mt-16">
      <span>
        Your name:
      </span>
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
      class="text-center bg-black text-white font-bold my-4 py-2 w-32 rounded-full hover:bg-blue-900 transition disabled:bg-gray-400"
    >
      Join
    </button>
    </form>
  </the-main-layout>
</template>