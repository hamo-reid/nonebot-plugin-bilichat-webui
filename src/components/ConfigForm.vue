<script setup lang="ts">
import { ref } from 'vue';
import API from '@/api';
import { useGlobalStore } from '@/store';
import { useMessage } from 'naive-ui';

const globalStore = useGlobalStore();
const message = useMessage();
const config = ref({});
let prevConfig = {};
const saving = ref(false);

async function saveConfig() {
  if (saving.value) return;
  const msgReactive = message.loading('保存中...', { duration: 0 });
  saving.value = true;
  const {status, data} = await API.saveConfig(config.value);
  if (status === 200) {
    msgReactive.type = 'success';
    msgReactive.content = '保存成功';
    setTimeout(() => {
      msgReactive.destroy();
    }, 2000);
    config.value = data;
    prevConfig = data;
  } else {
    msgReactive.type = 'error';
    msgReactive.content = '保存失败';
    setTimeout(() => {
      msgReactive.destroy();
    }, 2000);
  }
  saving.value = false;
}

async function initForm() {
  const {status: status2, data: data2} = await API.getConfig();
  if (status2 === 200) {
    config.value = data2;
    prevConfig = data2;
    message.info('已加载bot配置');
  } else {
    message.error('获取配置失败');
  }
}

function rollbackConfig() {
  config.value = prevConfig;
  message.info('已移除修改');
}

initForm();  // 初始化表单
</script>

<template>
  <vue-form
   v-model="config"
   :schema="globalStore.schema"
   @submit="saveConfig"
   @cancel="rollbackConfig"
   @validation-failed="message.error('表单验证失败，请检查')"
  />
</template>