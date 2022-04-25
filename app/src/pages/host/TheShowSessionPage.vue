<script setup lang="ts">
import TheMainLayout from '../../layouts/TheMainLayout.vue'
import Invite from '../../components/host/show/Invite.vue'
import GameField from '../../components/sessions/Fields/GameField.vue'
import { useSocketStore } from '../../store/socket';
import { useSessionStore } from '../../store/session';
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import Field from '../../types/Field';
import Cell from '../../enums/Cell'
import FieldRow from '../../types/FieldRow'
import Player from '../../models/Player'
import User from '../../models/User'
import PlayerState from '../../components/host/show/PlayerState.vue'

// Store
const socketStore = useSocketStore()
const sessionStore = useSessionStore()

// Props
const props = defineProps<{
  sessionId: String,
}>()

// Computed
const defaultField = computed<Field>(() => {
  const size = 10
  const field: Field = []

  for (let i: number = 0; i < size; i++) {
    const row: FieldRow = []
    for (let j: number = 0; j < size; j++) {
      row.push(Cell.EMPTY)
    }
    field.push(row)
  }

  return field
})

// Methods
function setupStore() {
  sessionStore.session.id = +props.sessionId
}
function setupSockets() {
  // Joined
  socketStore.socket.on('joined', data => {
    sessionStore.session.addPlayer(
      new Player(
        new User(data.user.name),
        data.field
      )
    )
  })

  // Setup
  socketStore.socket.on('setup', session => {
    session.players.forEach((item: Object, index: number) => {
      const player: Player = sessionStore.session.players[index]
      player.field = item.field
      player.setState(item.state)
    })
  })

  // Guess
  socketStore.socket.on('guess', session => {
    session.players.forEach((item: Object, index: number) => {
      const player: Player = sessionStore.session.players[index]
      player.field = item.field
      player.setState(item.state)
    })
  })
}

setupStore()
setupSockets()
</script>

<template>
  <the-main-layout>
    Session: {{ props.sessionId }}
    <div class="flex">
      <div
        v-for="index in 2"
        :key="index"
        class="relative"
      >
        <game-field :field="sessionStore.session.players[index - 1]?.field || defaultField" />
        <div
          v-if="!sessionStore.session.isReady()"
          class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
        >
          <invite
            :session-id="+props.sessionId"
            class="relative top-4 left-4 bg-white p-5"
          />
        </div>
        <player-state :player="sessionStore.session.players[index - 1]" />
      </div>
    </div>
  </the-main-layout>
</template>
