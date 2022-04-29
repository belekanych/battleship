<script setup lang="ts">
import BaseField from './BaseField.vue'
import Field from '../../../types/Field'
import Cell from '../../../enums/Cell'
import Player from '../../../models/Player'
import { ref, computed } from 'vue'

// Props
const props = defineProps<{ field: Field, player: Player }>()

// Emits
const emit = defineEmits(['cellUpdate'])

// Data
const selectedRow = ref(-1)
const selectedCol = ref(-1)
const selectedValue = ref(0)

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

const prediction = computed<number[][]>(() => {
  const predicted: number[][] = []

  field.value.forEach(row => {
    const newRow: number[] = []
    row.forEach(() => {
      newRow.push(0)
    })
    predicted.push(newRow)
  })

  if (selectedRow.value !== -1 && selectedCol.value !== -1 && field.value[selectedRow.value][selectedCol.value] === Cell.HIT) {
    for (let i = 0; i < 5; i++) {
      if (selectedCol.value - 5 + 1 + i < 0) {
        break
      }
      if (selectedCol.value + i > field.value.length) {
        break
      }

      for (let j = 0; j < 5; j++) {
        if (field.value[selectedRow.value][selectedCol.value - 5 + 1 + j] === Cell.MISS) {
          break
        }

        if (j === 4) {
          for (let k = 0; k < 5; k++) {
            predicted[selectedRow.value][selectedCol.value - 5 + 1 + k + i]++
          }
        }
      }
    }
  } else {
    predicted.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (field.value[rowIndex][colIndex] === Cell.MISS) {
          return
        }

        for (let i = 0; i < 5; i++) {
          if (colIndex + i >= row.length) {
            break
          }

          if (field.value[rowIndex][colIndex + i] === Cell.MISS) {
            break
          }

          if (i === 4) {
            for (let j = 0; j < 5; j++) {
              predicted[rowIndex][colIndex + j]++
            }
          }
        }

        for (let i = 0; i < 5; i++) {
          if (rowIndex + i >= field.value.length) {
            break
          }

          if (field.value[rowIndex + i][colIndex] === Cell.MISS) {
            break
          }

          if (i === 4) {
            for (let j = 0; j < 5; j++) {
              predicted[rowIndex + j][colIndex]++
            }
          }
        }
      })
    })
  }

  selectedRow.value = -1
  selectedCol.value = -1
  selectedValue.value = 0

  predicted.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell > selectedValue.value && field.value[rowIndex][colIndex] !== Cell.HIT) {
        selectedRow.value = rowIndex
        selectedCol.value = colIndex
        selectedValue.value = cell
      }
    })
  })

  console.log(String.fromCharCode('A'.charCodeAt(0) + selectedCol.value) + (selectedRow.value + 1))
  
  return predicted
})
</script>

<template>
  <base-field
    :field="field"
  >
    <template #cell="{ row, col }">
      {{ prediction[row][col] }}
    </template>
  </base-field>
</template>
