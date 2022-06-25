<script setup lang="ts">
  import Cell from '@/enums/Cell'
  import Field from '@/models/Field'
  import FieldRow from '@/types/FieldRow'
  import GameField from '@/components/sessions/fields/GameField.vue'
  import Invite from '@/components/sessions/show/Invite.vue'
  import Player from '@/models/Player'
  import PlayerState from '@/components/sessions/show/PlayerState.vue'
  import PlayerType from '@/types/Player'
  import SessionType from '@/types/Session'
  import TheMainLayout from '@/layouts/TheMainLayout.vue'
  import { computed } from 'vue'
  import { useSessionStore } from '@/store/session'
  import { useSocketStore } from '@/store/socket'

  // Store
  const socketStore = useSocketStore()
  const sessionStore = useSessionStore()

  // Props
  const props = defineProps<{
    sessionId: String
  }>()
  const sessionId: number = +props.sessionId

  // Computed
  const defaultField = computed<Field>(() => {
    const size = 10
    const field: Field = new Field()

    for (let i: number = 0; i < size; i++) {
      const row: FieldRow = []
      for (let j: number = 0; j < size; j++) {
        row.push(Cell.EMPTY)
      }
      field.rows.push(row)
    }

    return field
  })

  // Methods
  function setupStore() {
    sessionStore.session.id = sessionId
  }
  function setupSockets() {
    // Updated
    socketStore.socket.on('updated', (session: SessionType) => {
      const players: PlayerType[] = session.players || []

      sessionStore.session.players = []

      players.forEach((player: PlayerType, index: number) => {
        sessionStore.session.players[index] = new Player(player)
      })
    })

    socketStore.socket.emit('view', sessionId)
  }

  setupStore()
  setupSockets()
</script>

<template>
  <the-main-layout>
    <span class="text-white"> Session: {{ sessionStore.session.id }} </span>
    <div class="flex">
      <div v-for="index in 2" :key="index" class="relative">
        <game-field
          :field="
            sessionStore.session.isReady()
              ? sessionStore.session.players[index - 1]?.payload.hitMap
              : defaultField
          "
        />
        <div
          v-if="!sessionStore.session.isReady()"
          class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
        >
          <invite
            :session-id="sessionStore.session.id"
            class="p-5 bg-white relative top-1 left-4 ml-1"
          />
        </div>
        <player-state :player="sessionStore.session.players[index - 1]" />
      </div>
    </div>
  </the-main-layout>
</template>
