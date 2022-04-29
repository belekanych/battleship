<script setup lang="ts">
import BaseField from './BaseField.vue'
import Field from '../../../types/Field'
import Cell from '../../../enums/Cell'
import { computed } from 'vue'

// Props
const props = defineProps<{ field: Field }>()

// Emits
const emit = defineEmits(['cellUpdate'])

// Computed
const field = computed<Field>(() => {
  const field: Field = [...props.field]

  field.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      field[rowIndex][colIndex] = cell === Cell.SHIP ? Cell.EMPTY : cell
    })
  })

  return field
})

// Methods
function onCellClick (row: number, col: number): void {
  if (field.value[row][col] !== Cell.EMPTY) {
    return
  }

  emit('cellUpdate', row, col)
}
</script>

<template>
  <base-field
    :field="field"
    @cell-click="onCellClick"
  />
</template>
