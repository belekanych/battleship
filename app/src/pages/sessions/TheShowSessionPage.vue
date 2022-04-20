<script setup lang="ts">
import TheMainLayout from '../../layouts/TheMainLayout.vue'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { sessions as api } from '../../api/sessions.ts'

// Props
const props = defineProps<{
  sessionId: String,
}>()

// Data
const joinQrCode: Ref<string> = ref('')

// Methods
async function loadQrCode() {
  const { data: qrCode } = await api.getJoinQrCode(props.sessionId)
  joinQrCode.value = qrCode
}
loadQrCode()
</script>

<template>
  <the-main-layout>
    Session: {{ props.sessionId }}
    <img :src="joinQrCode" />
  </the-main-layout>
</template>
