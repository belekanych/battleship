<script setup lang="ts">
  import BaseField from './BaseField.vue'
  import Field from '@/models/Field'
  import Cell from '@/enums/Cell'
  import { computed } from 'vue'

  // Props
  const props = defineProps<{ field: Field }>()

  // Emits
  const emit = defineEmits(['cellUpdate'])

  // Computed
  const field = computed<Field>(() => {
    const field: Field = new Field({ rows: [...props.field.rows] })

    field.rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell >= Cell.S1 && cell <= Cell.S5) {
          field.rows[rowIndex][colIndex] = Cell.EMPTY
        }
      })
    })

    return field
  })

  // Methods
  function onCellClick(row: number, col: number): void {
    if (field.value.rows[row][col] !== Cell.EMPTY) {
      return
    }

    emit('cellUpdate', row, col)
  }
</script>

<template>
  <base-field :field="field" @cell-click="onCellClick" />
</template>
