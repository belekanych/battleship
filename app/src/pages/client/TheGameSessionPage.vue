<script setup lang="ts">
  import GameField from '../../components/sessions/Fields/GameField.vue'
  import PlayerPayload from '@/models/PlayerPayload'
  import PlayerState from '../../enums/PlayerState'
  import PlayerType from '@/types/Player'
  import TheMainLayout from '../../layouts/TheMainLayout.vue'
  import { computed } from 'vue'
  import { useSessionStore } from '../../store/session'
  import { useSocketStore } from '../../store/socket'

  // Store
  const sessionStore = useSessionStore()
  const socketStore = useSocketStore()

  // Computed
  const isMoving = computed<boolean>(() => {
    return sessionStore.enemy.state === PlayerState.WAITING
  })

  // Methods
  function onCellUpdate(row: number, col: number): void {
    console.log({ row, col })
    if (sessionStore.enemy.state === PlayerState.MOVE) {
      return
    }

    socketStore.socket.emit('guess', {
      row,
      col,
    })
  }
  function setupSockets(): void {
    socketStore.socket.on('guess', (player: PlayerType) => {
      sessionStore.session.players[1].setPayload(
        new PlayerPayload(player.payload)
      )
      sessionStore.session.players[1].setState(player.state)
    })
  }

  setupSockets()
</script>

<template>
  <the-main-layout>
    <game-field
      :field="sessionStore.enemy.payload.field"
      @cell-update="onCellUpdate"
    />
    <div class="text-center">
      <span
        :class="{
          'bg-green-500': isMoving,
          'bg-gray-500': !isMoving,
          'text-white rounded-full pb-1 px-4': true,
        }"
      >
        {{ isMoving ? 'Your move' : "Your oponent's move" }}
      </span>
    </div>
  </the-main-layout>
</template>
