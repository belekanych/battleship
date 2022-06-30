<script setup lang="ts">
  import Cell from '@/enums/Cell'
  import Field from '@/models/Field'
  import Ship from '@/models/Ship'

  // Props
  const props = defineProps<{
    modelValue: Cell
    ships: Ship[]
    field: Field
  }>()

  // Emits
  const emit = defineEmits(['update:modelValue'])

  // Methods
  function isChecked(ship: Ship): boolean {
    return ship.cell === props.modelValue
  }
  function getLength(ship: Ship): number {
    return props.field.rows.reduce((rowSum, row) => {
      return rowSum + row.filter(cell => cell === ship.cell).length
    }, 0)
  }
  function isFullyPlaced(ship: Ship): boolean {
    return ship.length === getLength(ship)
  }
  function find(cell: string): Ship {
    return props.ships.filter(ship => ship.cell === parseInt(cell))[0]
  }
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-5">
    <div v-for="ship in props.ships" :key="ship.cell">
      <input
        type="radio"
        name="ship"
        class="hidden"
        :id="`ship${ship.cell}`"
        :value="ship.cell"
        :checked="isChecked(ship)"
        @change="$emit('update:modelValue', find($event.target.value))"
      />
      <label
        class="block w-44 cursor-pointer text-center my-4 mx-2 py-2 px-4 border rounded bg-white text-blue-900 hover:bg-gray-100 transition disabled:bg-gray-300"
        :class="{
          'border-blue-900': isChecked(ship),
        }"
        :for="`ship${ship.cell}`"
      >
        {{ ship.name }} ({{ getLength(ship) }}/{{ ship.length }})
        <span v-if="isFullyPlaced(ship)">✔</span>
      </label>
    </div>
  </div>
</template>
