<script setup lang="ts">
import { NDialog, NSpace, NInput } from 'naive-ui';
import { useGlobalStore, useConfigStore } from '@/store';
import { ref } from 'vue';

const globalStore = useGlobalStore();
const configStore = useConfigStore();

const token = ref('');
const submitToken = () =>{
  globalStore.setToken(token.value);
  configStore.getConfigSchema();
}

</script>

<template>
  <n-dialog title="Token验证" positive-text="确认" :show-icon="false" :closable="false" class="token-dialog" @positive-click="submitToken">
    <n-space vertical>
      <n-input v-model:value="token" placeholder="请输入token" type="password" />
    </n-space>
  </n-dialog>
</template>

<style scoped>
.token-dialog {
  width: 300px;
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
}
</style>