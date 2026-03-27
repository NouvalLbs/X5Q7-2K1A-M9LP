<template>
  <RouterView />
</template>

<script setup>
  import { onMounted } from 'vue';
  import { CloseNUIHandler, RecieveNUIMessage } from '@/services/NUIHandler';

  onMounted(() => {
    CloseNUIHandler();
    RecieveNUIMessage();
  })
</script>