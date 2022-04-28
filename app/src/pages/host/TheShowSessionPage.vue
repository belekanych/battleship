<script setup lang="ts">
  import Cell from '../../enums/Cell'
  import Field from '../../types/Field'
  import FieldRow from '../../types/FieldRow'
  import GameField from '../../components/sessions/Fields/GameField.vue'
  import Invite from '../../components/host/show/Invite.vue'
  import Player from '../../models/Player'
  import PlayerPayload from '@/models/PlayerPayload'
  import PlayerState from '@/components/host/show/PlayerState.vue'
  import PlayerType from '../../types/Player'
  import SessionType from '@/types/Session'
  import TheMainLayout from '../../layouts/TheMainLayout.vue'
  import { computed } from 'vue'
  import { useSessionStore } from '../../store/session'
  import { useSocketStore } from '../../store/socket'

  // Store
  const socketStore = useSocketStore()
  const sessionStore = useSessionStore()

  // Props
  const props = defineProps<{
    sessionId: String
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
    socketStore.socket.on('joined', (player: PlayerType) => {
      sessionStore.session.addPlayer(new Player(player))
    })

    // Setup
    socketStore.socket.on('setup', (session: SessionType) => {
      const players: PlayerType[] = session.players || []

      players.forEach((item: PlayerType, index: number) => {
        const player: Player = sessionStore.session.players[index]
        player.setPayload(new PlayerPayload(item.payload))
        player.setState(item.state)
      })
    })

    // Guess
    socketStore.socket.on('guess', (session) => {
      const players: PlayerType[] = session.players || []

      players.forEach((item: PlayerType, index: number) => {
        const player: Player = sessionStore.session.players[index]
        player.setPayload(new PlayerPayload(item.payload))
        player.setState(item.state)
      })
    })
  }

  setupStore()
  setupSockets()
</script>

<template>
  <the-main-layout>
    Session: {{ sessionStore.session.id }}
    <div class="flex">
      <div v-for="index in 2" :key="index" class="relative">
        <game-field
          :field="
            sessionStore.session.players[index - 1]?.payload.field ||
            defaultField
          "
        />
        <div
          v-if="!sessionStore.session.isReady()"
          class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
        >
          <invite
            :session-id="sessionStore.session.id"
            class="relative top-4 left-4 bg-white p-5"
          />
        </div>
        <player-state :player="sessionStore.session.players[index - 1]" />
      </div>
    </div>
  </the-main-layout>
</template>
