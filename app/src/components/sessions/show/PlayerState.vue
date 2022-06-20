<script setup lang="ts">
  import Player from '../../../models/Player'
  import PlayerState from '../../../enums/PlayerState'
  import { computed } from 'vue'

  // Props
  const props = defineProps<{
    player: Player
  }>()

  // Computed
  const player = computed<Player>(() => {
    return props.player
  })
  const label = computed<string>(() => {
    if (!player.value) {
      return ''
    }

    const states = {
      [PlayerState.JOINED]: 'has joined',
      [PlayerState.READY]: 'is ready',
      [PlayerState.MOVE]: 'is moving',
      [PlayerState.WAITING]: 'is waiting',
      [PlayerState.LOST]: 'has lost',
      [PlayerState.WON]: 'has won!',
    }

    return `${player.value.user.name} ${states[player.value.state]}`
  })
  const classes = computed<string>(() => {
    if (!player.value) {
      return ''
    }

    const colors = {
      [PlayerState.JOINED]: 'bg-blue-300 text-blue-900',
      [PlayerState.READY]: 'bg-white text-blue-900',
      [PlayerState.MOVE]: 'bg-white text-blue-900',
      [PlayerState.WAITING]: 'bg-blue-300 text-blue-900',
      [PlayerState.LOST]: 'bg-red-500 text-white',
      [PlayerState.WON]: 'bg-green-500 text-white',
    }

    return colors[player.value.state]
  })
</script>

<template>
  <div class="text-center">
    <span :class="`${classes} rounded-full pb-1 px-4 transition`">
      {{ label }}
    </span>
  </div>
</template>
