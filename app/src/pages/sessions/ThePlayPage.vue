<script setup lang="ts">
  import GameField from '@/components/sessions/fields/GameField.vue'
  import Player from '@/models/Player'
  import PlayerState from '@/enums/PlayerState'
  import PlayerType from '@/types/Player'
  import SessionType from '@/types/Session'
  import TheMainLayout from '@/layouts/TheMainLayout.vue'
  import { computed } from 'vue'
  import { useSessionStore } from '@/store/session'
  import { useSocketStore } from '@/store/socket'

  // Store
  const sessionStore = useSessionStore()
  const socketStore = useSocketStore()

  // Computed
  const isMoving = computed<boolean>(() => {
    return sessionStore.enemy.state === PlayerState.WAITING
  })

  // Methods
  function onCellUpdate(row: number, col: number): void {
    if (sessionStore.enemy.state === PlayerState.MOVE) {
      return
    }

    socketStore.socket.emit('move', {
      row,
      col,
    })
  }
  function setupSockets(): void {
    socketStore.socket.on('updated', (session: SessionType) => {
      const players: PlayerType[] = session.players || []

      players.forEach((playerData: PlayerType, index: number) => {
        sessionStore.session.players[index] = new Player(playerData)
      })
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
