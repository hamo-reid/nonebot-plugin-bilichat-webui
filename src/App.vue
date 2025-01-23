<script setup lang="ts">
import MainPage from './pages/MainPage.vue';
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui';
import { NMessageProvider, lightTheme } from 'naive-ui';
import { useGlobalStore } from './store';

const globalStore = useGlobalStore();
globalStore.getToken()
globalStore.getConfigSchema()
// 修改主题
const myTheme = (()=>{
  const t = lightTheme;
  t.common.primaryColor = "#05abffff";
  t.common.primaryColorHover = "#05bcffff";
  t.common.primaryColorPressed = "#059affff";
  t.common.primaryColorSuppl = "#0589ffff";
  return t;
})()
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="myTheme">
    <n-message-provider>
      <main-page />
    </n-message-provider>
  </n-config-provider>
</template>