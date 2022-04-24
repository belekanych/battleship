<script setup lang="ts">
import Player from '../../../models/Player'
import PlayerState from '../../../enums/PlayerState'
import { computed } from 'vue'

// Props
const props = defineProps<{
  player: Player,
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
  }

  return `${player.value.user.name} ${states[player.value.state]}`
})
const color = computed<string>(() => {
  if (!player.value) {
    return ''
  }

  const colors = {
    [PlayerState.JOINED]: 'orange-500',
    [PlayerState.READY]: 'blue-500',
    [PlayerState.MOVE]: 'green-500',
    [PlayerState.WAITING]: 'gray-500',
  }

  return colors[player.value.state]
})
</script>

<template>
  <div class="text-center">
    <span :class="`bg-${color} text-white rounded-full pb-1 px-4`">
      {{ label }}
    </span>
  </div>
</template>