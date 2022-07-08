<script setup lang="ts">
  import GameField from '@/components/sessions/fields/GameField.vue'
  import Player from '@/models/Player'
  import PlayerState from '@/enums/PlayerState'
  import PlayerStateBadge from '@/components/sessions/play/PlayerStateBadge.vue'
  import PlayerType from '@/types/Player'
  import RestartGame from '@/components/sessions/play/RestartGame.vue'
  import SessionType from '@/types/Session'
  import { useBeforeUnload } from '@/composables/useBeforeUnload'
  import { useSessionStore } from '@/store/session'
  import { useSocketStore } from '@/store/socket'

  // Store
  const sessionStore = useSessionStore()
  const socketStore = useSocketStore()

  // Methods
  function onCellUpdate(row: number, col: number): void {
    const forbiddenStates = [
      PlayerState.MOVE,
      PlayerState.LOST,
      PlayerState.WON,
    ]

    if (forbiddenStates.includes(sessionStore.enemy.state)) {
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
  useBeforeUnload()
</script>

<template>
  <game-field
    :field="sessionStore.enemy.payload.hitMap"
    @cell-update="onCellUpdate"
  />
  <player-state-badge :player="sessionStore.player" />
  <div class="h-10">
    <restart-game />
  </div>
</template>
