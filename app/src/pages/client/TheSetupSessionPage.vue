<script setup lang="ts">
import TheMainLayout from '../../layouts/TheMainLayout.vue'
import SetupField from '../../components/sessions/Fields/SetupField.vue'
import { useSessionStore } from '../../store/session'
import { computed } from 'vue'
import Cell from '../../enums/Cell'
import { useSocketStore } from '../../store/socket'

// Store
const sessionStore = useSessionStore()
const socketStore = useSocketStore()

// Computed
const field = computed(() => {
  return sessionStore.player.field
})

// Methods
function onCellUpdate (rowIndex: number, colIndex: number, value: Cell): void {
  sessionStore.player.field[rowIndex][colIndex] = value
}

function onSubmit(): void {
  socketStore.socket.emit('setup', {
    sessionId: sessionStore.sessionId,
    field: field.value,
  })
}
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
      @click="onSubmit"
    >
      Start
    </button>
  </the-main-layout>
</template>