<script setup lang="ts">
  import BaseField from './BaseField.vue'
  import Cell from '@/enums/Cell'
  import Direction from '@/enums/Direction'
  import Field from '@/models/Field'
  import Ship from '@/models/Ship'
  import ShipControl from '../setup/ShipControl.vue'
  import type { Ref } from 'vue'
  import { ref } from 'vue'

  // Props
  interface Props {
    field: Field
    ships: Ship[]
  }
  const { field, ships } = defineProps<Props>()

  // Emits
  const emit = defineEmits(['cell-update'])

  // Data
  const active: Ref<Ship> = ref(ships[0])

  // Methods
  function getPlacedCount(ship: Ship): number {
    return field.rows.reduce((rowSum, row) => {
      return rowSum + row.filter(cell => cell === ship.cell).length
    }, 0)
  }
  function canBePlaced(row: number, col: number): boolean {
    if (field.rows[row][col] !== Cell.EMPTY) {
      return false
    }

    const placedCount: number = getPlacedCount(active.value)

    // The ship is not placed yet
    if (!placedCount) {
      return true
    }

    // The ship is fully placed
    if (placedCount === active.value.length) {
      return false
    }

    // The ship is partially placed
    for (const dir of Object.values(Direction)) {
      let length: number = 0
      let rowIndex: number = row
      let colIndex: number = col

      for (let shift = 0; shift < placedCount; shift++) {
        const handle = {
          [Direction.TOP]: () => rowIndex--,
          [Direction.RIGHT]: () => colIndex++,
          [Direction.BOTTOM]: () => rowIndex++,
          [Direction.LEFT]: () => colIndex--,
        }[dir]

        if (handle) {
          handle()
        }

        if (
          !handle ||
          field.rows[rowIndex] === undefined ||
          field.rows[rowIndex][colIndex] === undefined
        ) {
          break
        }

        if (field.rows[rowIndex][colIndex] === active.value.cell) {
          length++
        }
      }

      if (length === placedCount) {
        return true
      }
    }

    return false
  }
  function canBeCleared(row: number, col: number): boolean {
    const value = field.rows[row][col]

    // The cell is already empty
    if (value === Cell.EMPTY) {
      return false
    }

    // The cell contains another ship
    if (value !== active.value.cell) {
      return false
    }

    // Do not allow to remove central parts
    // Case 1: Vertical ships
    if (
      field.rows[row - 1] &&
      field.rows[row - 1][col] === active.value.cell &&
      field.rows[row + 1] &&
      field.rows[row + 1][col] === active.value.cell
    ) {
      return false
    }

    // Do not allow to remove central parts
    // Case 2: Horizontal ships
    if (
      field.rows[row][col - 1] === active.value.cell &&
      field.rows[row][col + 1] === active.value.cell
    ) {
      return false
    }

    return true
  }
  function onCellClick(row: number, col: number) {
    let value: Cell = field.rows[row][col]

    if (canBeCleared(row, col)) {
      value = Cell.EMPTY
    } else if (canBePlaced(row, col)) {
      value = active.value.cell
    }

    emit('cell-update', row, col, value)
  }
</script>

<template>
  <div class="flex flex-col items-center">
    <base-field :field="field" @cell-click="onCellClick" />
    <ship-control v-model="active" :ships="ships" :field="field" />
  </div>
</template>
