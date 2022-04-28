<script setup lang="ts">
  import Cell from '../../enums/Cell'
  import Field from '../../types/Field'
  import Player from '../../models/Player'
  import PlayerState from '../../enums/PlayerState'
  import PlayerType from '@/types/Player'
  import SetupField from '../../components/sessions/Fields/SetupField.vue'
  import TheMainLayout from '../../layouts/TheMainLayout.vue'
  import User from '../../models/User'
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
    return sessionStore.session.players[0]
  })
  const field = computed<Field>(() => {
    return player.value.payload.field
  })
  const disabled = computed<boolean>(() => {
    return player.value.state === PlayerState.READY
  })
  const btnText = computed<string>(() => {
    return disabled.value ? 'Waiting...' : 'Start'
  })

  // Methods
  function onCellUpdate(rowIndex: number, colIndex: number, value: Cell): void {
    sessionStore.session.players[0].payload.field[rowIndex][colIndex] = value
  }
  function onSubmit(): void {
    socketStore.socket.emit('setup', field.value)
    sessionStore.session.players[0].setState(PlayerState.READY)
  }
  function setupSockets(): void {
    socketStore.socket.on('ready', (enemy: PlayerType) => {
      const player: Player = new Player(enemy)
      player.setState(enemy.state)

      sessionStore.session.addPlayer(player)

      router.push({ name: 'client.sessions.game' })
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
