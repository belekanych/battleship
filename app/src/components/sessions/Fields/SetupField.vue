<script setup lang="ts">
import BaseField from './BaseField.vue'
import Field from '../../../types/Field'
import Cell from '../../../enums/Cell'

// Props
interface Props {
  field: Field
}
const { field } = defineProps<Props>()

// Emits
const emit = defineEmits(['cellUpdate'])

// Methods
function canBePlaced (row: number, col: number): boolean {
  return field[row][col] === Cell.EMPTY
}
function onCellClick (row: number, col: number) {
  let value = field[row][col];

  if (value === Cell.SHIP) {
    value = Cell.EMPTY
  } else if (canBePlaced(row, col)) {
    value = Cell.SHIP
  }

  emit('cellUpdate', row, col, value)
}
</script>

<template>
  <base-field
    :field="field"
    @cell-click="onCellClick"
  />
</template>
