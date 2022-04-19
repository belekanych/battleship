<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import Cell from '../../enums/Cell'
import Field from '../../types/Field'
import FieldRow from '../../types/FieldRow'
import SetupField from './Fields/SetupField.vue'

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

// Methods
function onCellUpdate (rowIndex: number, colIndex: number, value: Cell): void {
  field.value[rowIndex][colIndex] = value
}
</script>

<template>
  <setup-field
    :field="field"
    @cell-update="onCellUpdate"
  />
</template>
