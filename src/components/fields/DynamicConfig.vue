<script setup lang="ts">
import { reactive } from 'vue';
import { NScrollbar, NCard } from 'naive-ui';
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  dynamicType: Array<string>,
  pushType: Array<string>,
})
const emit = defineEmits<{
  'update:modelValue': [value: any]
  'close': []
}>()
const tempConfig = reactive({
  ...props.modelValue
})
const submitConfig = () => {
  emit('update:modelValue', tempConfig)
  emit('close')
}
</script>

<template>
  <n-card class="dynamic-config" title="动态配置" :bordered="false" role="dialog">
    <n-scrollbar style="max-height: calc(90vh - 160px);min-height: 300px;padding: 1rem;">
      <div>
        <n-form label-width="auto">
          <n-form-item v-for="k in props.dynamicType" :label="k">
            <n-select v-model:value="tempConfig[k]"
              :options="props.pushType!.map((item) => ({ label: item, value: item }))" />
          </n-form-item>
        </n-form>
      </div>
    </n-scrollbar>
    <template #footer>
      <div class="btns" style="display: flex;justify-content: end;">
        <n-button style="margin-right: 1rem;" @click="emit('close')">取消</n-button>
        <n-button type="primary" @click="submitConfig">确定</n-button>
      </div>
    </template>
  </n-card>
</template>

<style scoped lang="scss">
.dynamic-config {
  max-width: 600px;
}
</style>