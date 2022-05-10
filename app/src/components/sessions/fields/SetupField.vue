<script setup lang="ts">
  import BaseField from './BaseField.vue'
  import Cell from '@/enums/Cell'
  import Direction from '@/enums/Direction'
  import Field from '@/types/Field'
  import ShipControl from '../setup/ShipControl.vue'
  import type { Ref } from 'vue'
  import { ref } from 'vue'

  // Static data
  const ships = {
    [Cell.S1]: {
      name: 'Carrier',
      length: 5,
    },
    [Cell.S2]: {
      name: 'Battleship',
      length: 4,
    },
    [Cell.S3]: {
      name: 'Destroyer',
      length: 3,
    },
    [Cell.S4]: {
      name: 'Submarine',
      length: 3,
    },
    [Cell.S5]: {
      name: 'Patrol Boat',
      length: 2,
    },
  }

  // Props
  interface Props {
    field: Field
  }
  const { field } = defineProps<Props>()

  // Emits
  const emit = defineEmits(['cell-update'])

  // Data
  const active: Ref<Cell.S1 | Cell.S2 | Cell.S3 | Cell.S4 | Cell.S5> = ref(
    Cell.S1
  )

  // Methods
  function getPlacedCount(ship: Cell): number {
    let count: number = 0

    field.forEach((row) => {
      row.forEach((cell) => {
        if (cell === ship) {
          count++
        }
      })
    })

    return count
  }
  function canBePlaced(row: number, col: number): boolean {
    if (field[row][col] !== Cell.EMPTY) {
      return false
    }

    const placedCount: number = getPlacedCount(active.value)

    // The ship is not placed yet
    if (!placedCount) {
      return true
    }

    // The ship is fully placed
    if (placedCount === ships[active.value].length) {
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
          field[rowIndex] === undefined ||
          field[rowIndex][colIndex] === undefined
        ) {
          break
        }

        if (field[rowIndex][colIndex] === active.value) {
          length++
        }
      }

      if (length === placedCount) {
        return true
      }
    }

    return false
  }
  function onCellClick(row: number, col: number) {
    let value = field[row][col]

    if (value === active.value) {
      value = Cell.EMPTY
    } else if (canBePlaced(row, col)) {
      value = active.value
    }

    emit('cell-update', row, col, value)
  }
</script>

<template>
  <div class="flex flex-col items-center">
    <base-field :field="field" @cell-click="onCellClick" />
    <ship-control v-model="active" :ships="ships" />
  </div>
</template>
