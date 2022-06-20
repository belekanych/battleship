<script setup lang="ts">
  import Cell from '@/enums/Cell'
  import Field from '@/models/Field'

  // Props
  const props = defineProps<{
    modelValue: Cell
    ships: {}
    field: Field
  }>()

  // Emits
  const emit = defineEmits(['update:modelValue'])

  // Methods
  function isChecked(key: string): boolean {
    return parseInt(key) === props.modelValue
  }
  function getLength(key: string): number {
    const shipId = parseInt(key)

    let length = 0

    props.field.rows.forEach((row) => {
      row.forEach((cell) => {
        if (cell === shipId) {
          length++
        }
      })
    })

    return length
  }
  function isFullyPlaced(key: string): boolean {
    return props.ships[parseInt(key)].length === getLength(key)
  }
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-5">
    <div v-for="(ship, key) in props.ships" :key="key">
      <input
        type="radio"
        name="ship"
        class="hidden"
        :id="`ship${key}`"
        :value="key"
        :checked="isChecked(key)"
        @change="$emit('update:modelValue', parseInt($event.target.value))"
      />
      <label
        class="block w-44 cursor-pointer text-center my-4 mx-2 py-2 px-4 border rounded bg-white text-blue-900 hover:bg-gray-100 transition disabled:bg-gray-300"
        :class="{
          'border-blue-900': isChecked(key),
        }"
        :for="`ship${key}`"
      >
        {{ ship.name }} ({{ getLength(key) }}/{{ ship.length }})
        <span v-if="isFullyPlaced(key)">✔</span>
      </label>
    </div>
  </div>
</template>
