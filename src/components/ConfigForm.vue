<script setup lang="ts">
import { ref } from 'vue';
import API from '@/api';

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
  } else {
    console.log('Config not saved');
  }
}

async function initForm() {
  schema.value = await getSchema();
  config.value = await getConfig();
  console.log(config.value);
  console.log(schema.value);
}

initForm();
</script>

<template>
  <vue-form v-model="config" :schema="schema" @submit="submitConfig"/>
</template>

<style lang="scss" scoped></style>