<script setup lang="ts">
import { sessions as api } from '../../../api/sessions'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// Props
const props = defineProps<{
  sessionId: number,
}>()

// Data
const inviteQRCode: Ref<string> = ref('')

// Computed
const inviteLink = computed<string>(() => {
  return router.resolve({
    name: 'client.sessions.join',
    params: { sessionId: props.sessionId }
  }).href
})

// Methods
async function loadQrCode() {
  const { data: qrCode } = await api.getJoinQrCode(props.sessionId)
  inviteQRCode.value = qrCode
}
loadQrCode()
</script>

<template>
  <a :href="inviteLink">
    <img :src="inviteQRCode" />
  </a>
</template>