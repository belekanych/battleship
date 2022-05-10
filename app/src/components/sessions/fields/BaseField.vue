<script setup lang="ts">
  import Cell from '../../../enums/Cell'
  import Field from '../../../types/Field'

  // Props
  interface Props {
    field: Field
  }
  const { field } = defineProps<Props>()

  // Emits
  const emit = defineEmits(['cell-click'])

  // Methods
  function isShip(cell: Cell): boolean {
    return [Cell.S1, Cell.S2, Cell.S3, Cell.S4, Cell.S5].includes(cell)
  }

  function isMiss(cell: Cell): boolean {
    return cell === Cell.MISS
  }

  function isHit(cell: Cell): boolean {
    return cell === Cell.HIT
  }

  function isDestroyed(cell: Cell): boolean {
    return cell == Cell.DESTROYED
  }

  function onCellClick(row: number, col: number) {
    emit('cell-click', row, col)
  }
</script>

<template>
  <table class="m-8">
    <tr>
      <td></td>
      <td
        v-for="(row, rowIndex) in field"
        :key="rowIndex"
        class="text-center font-bold w-8 pb-2"
      >
        {{ String.fromCharCode('A'.charCodeAt(0) + rowIndex) }}
      </td>
    </tr>
    <tr v-for="(row, rowIndex) in field" :key="rowIndex">
      <td class="text-right font-bold h-8 pr-4">
        <div>{{ rowIndex + 1 }}</div>
      </td>
      <td
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :class="{ 'bg-gray-900 border-gray-900': isShip(cell) || isHit(cell) }"
        class="border transition"
        @click="onCellClick(rowIndex, colIndex)"
      >
        <slot name="cell" :row="rowIndex" :col="colIndex" :cell="cell">
          <div
            v-if="isMiss(cell) || isHit(cell)"
            class="w-full h-full text-center"
            :class="{
              'text-gray-900': isMiss(cell),
              'text-white': isHit(cell),
            }"
          >
            x
          </div>
        </slot>
      </td>
    </tr>
  </table>
</template>
