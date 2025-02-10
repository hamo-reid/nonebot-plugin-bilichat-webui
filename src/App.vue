<script setup lang="ts">
import MainPage from './pages/MainPage.vue';
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui';
import { NMessageProvider, lightTheme } from 'naive-ui';

// 修改主题
const myTheme = (()=>{
  const biliTheme = lightTheme;
  biliTheme.common.primaryColor = "#05abffff";
  biliTheme.common.primaryColorHover = "#05bcffff";
  biliTheme.common.primaryColorPressed = "#059affff";
  biliTheme.common.primaryColorSuppl = "#0589ffff";
  return biliTheme;
})()
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="myTheme">
    <n-message-provider>
      <main-page />
    </n-message-provider>
  </n-config-provider>
</template>