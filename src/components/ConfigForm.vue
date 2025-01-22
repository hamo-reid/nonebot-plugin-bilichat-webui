<script setup lang="ts">
import { ref } from 'vue';
import API from '@/api';
import { useGlobalStore } from '@/store';
import { useMessage } from 'naive-ui';

const globalStore = useGlobalStore();
const message = useMessage();
const schema = ref({});
const config = ref({});

async function getSchema() {
  const res = await API.getConfigSchema();
  if (res) {
    return res;
  } else {
    return null;
  }
};

async function getConfig() {
  const res = await API.getConfig();
  if (res) {
    return res;
  } else {
    return null;
  }
}

async function submitConfig() {
  const res = await API.saveConfig(config.value);
  if (res) {
    config.value = res;
    message.success('配置已保存');
  } else {
    message.error('配置保存失败');
  }
}

async function initForm() {
  const schemaData = await getSchema();
  if (schemaData !== null) {
    schema.value = schemaData;
    globalStore.isGetConfigSchema = true;
    message.info('已加载bot配置');
  } else {
    message.error('Get config schema failed');
  };
  config.value = await getConfig();
}

initForm();
</script>

<template>
  <vue-form v-model="config" :schema="schema" @submit="submitConfig" @validation-failed="message.error('表单验证失败，请检查')"/>
</template>

<style lang="scss" scoped></style>