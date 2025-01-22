<script setup lang="ts">
import MainPage from './pages/MainPage.vue';
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui';
import { NMessageProvider } from 'naive-ui';
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <main-page />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
