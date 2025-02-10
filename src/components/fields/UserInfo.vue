<script setup lang="ts">
// 覆盖默认field
import { fieldProps, vueUtils } from '@lljj/vue3-form-naive';
import { defineComponent, computed, ref } from 'vue';
import type { FieldPropsType } from '@/types/vjsf';
import { NScrollbar, NConfigProvider } from 'naive-ui';

defineComponent({
  name: 'UserInfo'
})
const props = defineProps(
  fieldProps as FieldPropsType
);
const data = computed(() => {
  return vueUtils.getPathVal(props.rootFormData, props.curNodePath)
})
const isExpanded = ref(false)

</script>

<template>
  <div class="info-codeblock" :class="{ 'is-expanded': isExpanded }">
    <div class="expand-toggle" @click="isExpanded = !isExpanded">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 320 512">
        <path
          d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4l96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
          fill="currentColor"></path>
      </svg>
    </div>

    <n-config-provider class="codeblock" :theme-overrides="{
      Scrollbar: {
        height: '8px',
        width: '0',
        railInsetHorizontal: '4px 4px 4px auto',
        borderRadius: '2px',
        color: '#e3e3e3aa',
        colorHover: '#e3e3e3',
      },
    }">
      <n-scrollbar x-scrollable>
        <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      </n-scrollbar>
    </n-config-provider>

  </div>

</template>


<style scoped lang="scss">
.info-codeblock {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  .expand-toggle {
    width: 100%;
    height: 1.5rem;
    background-color: #ccc;
    cursor: pointer;

    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-left: 0.5rem;
      fill: #fff;
      transition: transform 0.3s ease-in-out;
    }
  }

  .codeblock {
    width: 100%;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease-in-out;
  }

  pre {
    padding: 0.5rem;
    width: 100%;
    background-color: #333;
    color: #fff;
    font-family: monospace;
    font-size: 0.8rem;
    line-height: 1.5;
    overflow: auto;
  }

  &.is-expanded {
    .expand-toggle svg {
      transform: rotate(180deg);
    }

    .codeblock {
      grid-template-rows: 1fr;
    }
  }
}
</style>