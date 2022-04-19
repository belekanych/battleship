<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import TheMainLayout from '../../layouts/TheMainLayout.vue'
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// Props
const props = defineProps<{
  sessionId: string,
}>()

// Data
const name: Ref<string> = ref('');

// Computed
const isValid = computed<boolean>(() => !!name.value.length)

// Methods
function onSubmit (): void {
  if (!isValid) {
    return
  }

  router.push({ name: 'sessions.setup', params: { sessionId: props.sessionId } })
}
</script>

<template>
  <the-main-layout>
    <form
      class="flex flex-col items-center"
      @submit.prevent="onSubmit"
    >
      <label class="flex flex-col mt-16">
      <span>
        Your name:
      </span>
      <input
        v-model="name"
        type="text"
        class="border border-black py-1 px-2"
        autofocus
      />
    </label>
    <button
      :disabled="!isValid"
      type="submit"
      class="text-center bg-black text-white font-bold my-4 py-2 w-32 rounded-full hover:bg-blue-900 transition disabled:bg-gray-400"
    >
      Join
    </button>
    </form>
  </the-main-layout>
</template>