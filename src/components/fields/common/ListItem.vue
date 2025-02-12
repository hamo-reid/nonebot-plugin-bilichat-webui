<script setup lang="ts">
import { SchemaField, globalOptions } from '@lljj/vue3-form-naive';
import type { FieldPropsType } from '@/types/vjsf';
import { ref, computed } from 'vue';

defineOptions({
  name: 'ListItem',
})
const props = defineProps<FieldPropsType>()
const isExpanded = ref(false);
const nextProps = computed(() => {
  const { ['ui:field']:_, ...nextUiSchema} = props.uiSchema;
  return {
    globalOptions: globalOptions,
    schema: props.schema,
    uiSchema: nextUiSchema,
    errorSchema: props.errorSchema,
    customRule: (
    {callback}: {[key: string]: any})=> {
      return callback();
    },
    customFormats: props.customFormats,
    rootSchema: props.rootSchema,
    rootFormData: props.rootFormData,
    curNodePath: props.curNodePath,
    required: props.required,
    needValidFieldGroup: props.needValidFieldGroup,
  }
})
</script>

<template>
  <div class="list-item" :class="{ expanded: isExpanded }">
    <div class="expand-toggle" @click="isExpanded = !isExpanded">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 320 512">
        <path
          d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4l96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
          fill="currentColor"></path>
      </svg>
    </div>
    <div class="item-wrap">
      <SchemaField class="content" v-bind="nextProps" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-item {
  .expand-toggle {
    width: 100%;
    height: 1.5rem;
    border: 1px solid #ccc;
    cursor: pointer;

    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-left: 0.5rem;
      fill: #fff;
      transition: transform 0.3s ease-in-out;
      transform: rotate(-90deg);
    }
  }

  .item-wrap {
    width: 100%;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease-in-out;

    .content {
      overflow: hidden;
    }
  }

  &.expanded {
    >.expand-toggle {
      svg {
        transform: rotate(0deg);
      }
    }

    >.item-wrap {
      grid-template-rows: 1fr;
    }
  }
}
</style>