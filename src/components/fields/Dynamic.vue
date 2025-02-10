<script setup lang="ts">
import { fieldProps, vueUtils } from '@lljj/vue3-form-naive';
import { defineComponent, computed, ref } from 'vue';
import DynamicConfig from '@/components/fields/DynamicConfig.vue';
import { NModal } from 'naive-ui';
import type { FieldPropsType } from '@/types/vjsf';
defineComponent({
  name: 'Dynamic'
})
const props = defineProps(
  fieldProps as FieldPropsType
)
const data = computed({
  get() {
    return vueUtils.getPathVal(props.rootFormData, props.curNodePath)
  },
  set(val) {
    vueUtils.setPathVal(props.rootFormData, props.curNodePath, val)
  }
})
data.value = props.schema.default
const showModal = ref(false)
</script>

<template>
  <n-form-item>
    <slot name="label">
      <label class="n-form-item-label n-form-item-label--right-mark">
        <span class="n-form-item-label__text">
          <span class="genFormLabel">{{ props.schema.title }}：</span>
        </span>
      </label>
    </slot>
    <div style="width: 100%">
      <n-button style="background-color: #fff;" @click="showModal = true">修改</n-button>
    </div>
    <n-modal v-model:show="showModal" >
      <dynamic-config
        v-model="data"
        :dynamicType="props.rootSchema.$defs.DynamicType.enum"
        :pushType="props.rootSchema.$defs.PushType.enum"
        @close="showModal = false"
        >
      </dynamic-config>
    </n-modal>
  </n-form-item>
</template>