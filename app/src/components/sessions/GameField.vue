<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import Cell from '../../enums/Cell'
import Field from '../../types/Field'
import FieldRow from '../../types/FieldRow'
import SetupField from './Fields/SetupField.vue'
import { io } from 'socket.io-client'

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

// Data
const field: Ref<Field> = ref(generateField(10))
const socket = io("http://192.168.0.105:3001");

// Methods
function onCellUpdate (rowIndex: number, colIndex: number, value: Cell): void {
  field.value[rowIndex][colIndex] = value
  socket.emit('updated', { data: field.value })
}
function setupSockets() {
  socket.on('updated', ({ data }) => {
    field.value = data
  })
}
setupSockets()
</script>

<template>
  <setup-field
    :field="field"
    @cell-update="onCellUpdate"
  />
</template>
