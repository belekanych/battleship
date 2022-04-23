<script setup lang="ts">
import TheMainLayout from '../../layouts/TheMainLayout.vue'
import Invite from '../../components/host/show/invite/Invite.vue'
import SetupField from '../../components/sessions/Fields/SetupField.vue'
import { useSocketStore } from '../../store/socket';
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import Field from '../../types/Field';
import Cell from '../../enums/Cell'
import FieldRow from '../../types/FieldRow'

// Store
const socketStore = useSocketStore()

// Props
const props = defineProps<{
  sessionId: String,
}>()

// Data
const players: Ref<string[]> = ref([])
const field: Ref<Field> = ref([])

// Computed
const firstPlayer = computed(() => {
  return players.value.length ? players.value[0] : null
})
const secondPlayer = computed(() => {
  return players.value.length > 1 ? players.value[1] : null
})

// Methods
function setupSockets() {
  socketStore.socket.on('joined', data => {
    players.value.push(data.player.user.name)
  })

  socketStore.socket.on('setup', data => {
    field.value = data
  })
}

const generateField = (size: number): Field => {
  const field: Field = []

  for (let i: number = 0; i < size; i++) {
    const row: FieldRow = []
    for (let j: number = 0; j < size; j++) {
      row.push(Cell.EMPTY)
    }
    field.push(row)
  }

  return field
}

setupSockets()
field.value = generateField(10)
</script>

<template>
  <the-main-layout>
    Session: {{ props.sessionId }}
    <div class="flex">
      <div class="relative">
        <setup-field :field="field" />
        <div
          v-if="!firstPlayer"
          class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
        >
          <invite
            :session-id="+props.sessionId"
            class="relative top-4 left-4 bg-white p-5"
          />
        </div>
        <span>{{ firstPlayer }}</span>
      </div>
      <div class="relative">
        <setup-field :field="field" />
        <div
          v-if="!secondPlayer"
          class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
        >
          <invite
            :session-id="+props.sessionId"
            class="relative top-4 left-4 bg-white p-5"
          />
        </div>
        <span>{{ secondPlayer }}</span>
      </div>
    </div>
  </the-main-layout>
</template>
