<script setup lang="ts">
import TheMainLayout from '../../layouts/TheMainLayout.vue'
import SetupField from '../../components/sessions/Fields/SetupField.vue'
import { useSessionStore } from '../../store/session'
import { computed } from 'vue'
import Cell from '../../enums/Cell'
import { useSocketStore } from '../../store/socket'
import Player from '../../models/Player'
import User from '../../models/User'
import Field from '../../types/Field'
import PlayerState from '../../enums/PlayerState'
import { useRouter } from 'vue-router'

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
  return player.value.field
})
const disabled = computed<boolean>(() => {
  return player.value.state === PlayerState.READY
})
const btnText = computed<string>(() => {
  return disabled.value ? 'Waiting...' : 'Start'
})

// Methods
function onCellUpdate (rowIndex: number, colIndex: number, value: Cell): void {
  sessionStore.session.players[0].field[rowIndex][colIndex] = value
}
function onSubmit(): void {
  socketStore.socket.emit('setup', field.value)
  sessionStore.session.players[0].setState(PlayerState.READY)
}
function setupSockets(): void {
  socketStore.socket.on('ready', enemy => {
    const player: Player = new Player(
      new User(enemy.user.name),
      enemy.field
    )
    player.setState(PlayerState.READY)

    sessionStore.session.addPlayer(player)

    router.push({ name: 'client.sessions.game' })
  })
}

setupSockets()
</script>

<template>
  <the-main-layout>
    <setup-field
      :field="field"
      @cell-update="onCellUpdate"
    />
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