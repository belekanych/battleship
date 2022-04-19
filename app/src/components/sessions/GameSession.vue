<template>
  <div class="flex space-between">
    <game-field />
    <game-field />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameField from './GameField.vue'

export default defineComponent({
  /**
   * Component name.
   */
  name: 'GameSession',

  /**
   * Registered components.
   */
  components: {
    GameField,
  },
})
</script>