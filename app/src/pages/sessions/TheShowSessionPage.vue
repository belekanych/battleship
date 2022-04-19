<script setup lang="ts">
import TheMainLayout from '../../layouts/TheMainLayout.vue'

const props = defineProps<{
  sessionId: String,
}>()
</script>

<template>
  <the-main-layout>
    Session: {{ props.sessionId }}
  </the-main-layout>
</template>
