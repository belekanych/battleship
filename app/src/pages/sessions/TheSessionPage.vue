<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-black font-extrabold text-6xl my-8">Battleship</h1>
    <game-session />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameSession from '../../components/sessions/GameSession.vue'

export default defineComponent({
  /**
   * Component name.
   */
  name: 'TheSessionPage',

  /**
   * Registered components.
   */
  components: {
    GameSession,
  },
})
</script>