<script setup lang="ts">
  import Cell from '@/enums/Cell'

  // Props
  const props = defineProps<{
    modelValue: Cell
    ships: {}
  }>()

  // Emits
  const emit = defineEmits(['update:modelValue'])

  // Methods
  function isChecked(key: string): boolean {
    return parseInt(key) === props.modelValue
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
        class="block cursor-pointer text-center my-4 mx-2 py-2 px-4 border rounded hover:bg-gray-100 transition disabled:bg-gray-400"
        :class="{ 'border-gray-900': isChecked(key) }"
        :for="`ship${key}`"
      >
        {{ ship.name }} ({{ ship.length }})
      </label>
    </div>
  </div>
</template>
