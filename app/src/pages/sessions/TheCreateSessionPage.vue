<script setup lang="ts">
import { useRouter } from 'vue-router'
import { sessions as api } from '../../api/sessions'

// Router
const router = useRouter()

// Methods
async function create() {
  try {
    const { data: session } = await api.create()
    router.push({ name: 'sessions.show', params: { sessionId: session.id } })
  } catch (e) {
    console.error(e)
  }
}

create()
</script>

<template>
  Loading
</template>