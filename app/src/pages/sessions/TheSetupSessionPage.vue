<script setup lang="ts">
import TheMainLayout from '../../layouts/TheMainLayout.vue'
import GameField from '../../components/sessions/GameField.vue'

function onSubmit () {
  alert('start')
}
</script>

<template>
  <the-main-layout>
    <game-field />
    <button
      type="button"
      class="text-center bg-black text-white font-bold my-4 py-2 w-32 rounded-full hover:bg-blue-900 transition disabled:bg-gray-400"
      @click="onSubmit"
    >
      Start
    </button>
  </the-main-layout>
</template>