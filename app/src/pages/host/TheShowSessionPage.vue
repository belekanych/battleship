<script setup lang="ts">
import TheMainLayout from '../../layouts/TheMainLayout.vue'
import Invite from '../../components/host/show/invite/Invite.vue'
import GameField from '../../components/sessions/GameField.vue'

// Props
const props = defineProps<{
  sessionId: String,
}>()
</script>

<template>
  <the-main-layout>
    Session: {{ props.sessionId }}
    <div class="flex">
      <div class="relative">
        <game-field />
        <div class="hidden absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <invite
            :session-id="+props.sessionId"
            class="relative top-4 left-4 bg-white p-5"
          />
        </div>
      </div>
      <div class="relative">
        <game-field />
        <div class="hidden absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <invite
            :session-id="+props.sessionId"
            class="relative top-4 left-4 bg-white p-5"
          />
        </div>
      </div>
    </div>
  </the-main-layout>
</template>
