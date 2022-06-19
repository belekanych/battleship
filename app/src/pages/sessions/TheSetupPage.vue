<script setup lang="ts">
  import Cell from '@/enums/Cell'
  import Field from '@/models/Field'
  import Player from '@/models/Player'
  import PlayerPayload from '@/models/PlayerPayload'
  import PlayerState from '@/enums/PlayerState'
  import PlayerType from '@/types/Player'
  import SessionType from '@/types/Session'
  import SetupField from '@/components/sessions/fields/SetupField.vue'
  import TheMainLayout from '@/layouts/TheMainLayout.vue'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSessionStore } from '../../store/session'
  import { useSocketStore } from '../../store/socket'

  // Router
  const router = useRouter()

  // Store
  const sessionStore = useSessionStore()
  const socketStore = useSocketStore()

  // Computed
  const player = computed<Player>(() => {
    return sessionStore.player
  })
  const playerId = computed<number | null>(() => {
    return sessionStore.playerId
  })
  const field = computed<Field>(() => {
    return player.value.payload.locationMap
  })
  const disabled = computed<boolean>(() => {
    return player.value.state === PlayerState.READY
  })
  const btnText = computed<string>(() => {
    return disabled.value ? 'Waiting...' : 'Start'
  })

  // Methods
  function onCellUpdate(rowIndex: number, colIndex: number, value: Cell): void {
    sessionStore.player.payload.locationMap.rows[rowIndex][colIndex] = value
  }
  function onSubmit(): void {
    socketStore.socket.emit('setup', field.value.rows)
  }
  function setupSockets(): void {
    socketStore.socket.on('updated', (session: SessionType) => {
      const playerPayload: PlayerPayload = player.value.payload
      const players: PlayerType[] = session.players || []

      players.forEach((playerData: PlayerType, index: number) => {
        // Current user's payload should be ignored if other player's data is updated
        if (playerData.id === playerId.value) {
          playerData.payload.locationMap.rows = playerPayload.locationMap.rows
          playerData.payload.hitMap.rows = playerPayload.hitMap.rows
        }
        sessionStore.session.players[index] = new Player(playerData)
      })

      if (sessionStore.session.isReady()) {
        router.push({ name: 'sessions.play' })
      }
    })
  }

  setupSockets()
</script>

<template>
  <the-main-layout>
    <setup-field :field="field" @cell-update="onCellUpdate" />
    <button
      type="button"
      class="text-center bg-black text-white font-bold my-4 py-2 w-32 rounded-full hover:bg-blue-900 transition disabled:bg-gray-400"
      :disabled="disabled"
      @click="onSubmit"
    >
      {{ btnText }}
    </button>
  </the-main-layout>
</template>
