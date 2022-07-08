<script setup lang="ts">
  import Cell from '@/enums/Cell'
  import Field from '@/models/Field'
  import Player from '@/models/Player'
  import PlayerPayload from '@/models/PlayerPayload'
  import PlayerState from '@/enums/PlayerState'
  import PlayerType from '@/types/Player'
  import SessionType from '@/types/Session'
  import SetupField from '@/components/sessions/fields/SetupField.vue'
  import Ship from '@/models/Ship'
  import { computed } from 'vue'
  import { useBeforeUnload } from '@/composables/useBeforeUnload'
  import { useSessionStore } from '@/store/session'
  import { useSocketStore } from '@/store/socket'

  // Static data
  const ships = [
    new Ship(Cell.S1, 'Carrier', 5),
    new Ship(Cell.S2, 'Battleship', 4),
    new Ship(Cell.S3, 'Destroyer', 3),
    new Ship(Cell.S4, 'Submarine', 3),
    new Ship(Cell.S5, 'Patrol Boat', 2),
  ]

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
    const requiredShips = ships.reduce((sum, ship) => sum + ship.length, 0)
    const selectedShips = sessionStore.player.payload.locationMap.rows.reduce((rowSum, row) => {
      return rowSum + row.filter(cell => cell !== Cell.EMPTY).length
    }, 0)

    return requiredShips !== selectedShips
  })
  const btnText = computed<string>(() => {
    return player.value.state === PlayerState.READY ? 'Waiting...' : 'Start'
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
    })
  }

  setupSockets()
  useBeforeUnload()
</script>

<template>
  <setup-field :field="field" :ships="ships" @cell-update="onCellUpdate" />
  <button
    type="button"
    class="text-center bg-white text-blue-900 font-bold my-4 py-2 w-32 rounded-full hover:bg-blue-100 transition disabled:bg-gray-300"
    :disabled="disabled"
    @click="onSubmit"
  >
    {{ btnText }}
  </button>
</template>
