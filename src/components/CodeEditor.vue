<script setup lang="ts">
import { computed } from 'vue';
import { yaml } from '@codemirror/lang-yaml';
import { json } from '@codemirror/lang-json';
import { useConfigStore } from '@/store';
import { debounce } from 'lodash';

const configStore = useConfigStore();
const extensions = [yaml(), json()];
const code = computed({
  get() {
    return JSON.stringify(configStore.config, null, 2);
  },
  set(val: any) {
    console.log(typeof val);
    updateConfig(val);
  }
})

function verifyConfig(config: any): object | false{
  try {
    return JSON.parse(config);
  } catch (e) {
    window.$message.error('配置文件格式错误');
    return false;
  }
}
const updateConfig = debounce((config: any) => {
  const verifyResult = verifyConfig(config);
  if (verifyResult) {
    configStore.tempUpdateConfig(verifyResult);
  }
}, 500);

</script>

<template>
  <codemirror v-model="code" :style="{
      flexShrink: 0,
      width: '100%',
      overflowX: 'hidden',
      minHeight: '300px'
    }" :extensions="extensions" @change="updateConfig">
  </codemirror>
</template>