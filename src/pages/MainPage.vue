<script setup lang="ts">
import ConfigForm from '@/components/ConfigForm.vue';
import GlobalLoading from '@/components/GlobalLoading.vue';
import TokenDialog from '@/components/TokenDialog.vue';
import { useMessage } from 'naive-ui';
import { useGlobalStore } from '@/store';

window.$message = useMessage();

const globalStore = useGlobalStore();
</script>

<template>
  <div class="container">
    <global-loading />
    <header>
      <span>BiliChat</span>
    </header>
    <main>
      <config-form v-if="globalStore.isGetConfigSchema" />
    </main>
    <TokenDialog v-if="!globalStore.hasToken"></TokenDialog>
  </div>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.25rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
  background-color: #05aeec;
  padding: 0 1rem;
}

main {
  padding: 1rem;
  margin: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
}
</style>