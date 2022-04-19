<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const sessionId = Math.ceil(Math.random()*10000)

router.push({ name: 'sessions.show', params: { sessionId } })
</script>

<template>
  Loading
</template>