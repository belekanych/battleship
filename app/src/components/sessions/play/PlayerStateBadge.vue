<script setup lang="ts">
  import Player from '@/models/Player'
  import PlayerState from '@/enums/PlayerState'
  import { computed } from 'vue'

  // Props
  const props = defineProps<{
    player: Player
  }>()

  // Computed
  const classes = computed<string>(() => {
    const colors = {
      [PlayerState.JOINED]: '',
      [PlayerState.READY]: '',
      [PlayerState.MOVE]: 'bg-white text-blue-900',
      [PlayerState.WAITING]: 'bg-blue-300 text-blue-900',
      [PlayerState.LOST]: 'bg-red-500 text-white',
      [PlayerState.WON]: 'bg-green-500 text-white',
    }

    return colors[props.player.state]
  })
  const label = computed<string>(() => {
    const labels = {
      [PlayerState.JOINED]: '',
      [PlayerState.READY]: '',
      [PlayerState.MOVE]: 'Your move',
      [PlayerState.WAITING]: "Your enemy's move",
      [PlayerState.LOST]: 'You lost',
      [PlayerState.WON]: 'You won!',
    }

    return labels[props.player.state]
  })
</script>

<template>
  <div class="text-center">
    <span :class="`${classes} rounded-full pb-1 px-4`">
      {{ label }}
    </span>
  </div>
</template>
