<script setup lang="ts">
import { defineComponent } from 'vue';
import { useConfigStore } from '@/store';
import { useMessage } from 'naive-ui';
import UserInfo from '@/components/fields/UserInfo.vue';
import Dynamic from '@/components/fields/Dynamic.vue';
defineComponent({
  name: 'ConfigForm',
  components: { UserInfo },
})

const configStore = useConfigStore();
const message = useMessage();

/**
 * 保存配置
 */
// async function saveConfig() {
//   if (saving.value) return;
//   const msgReactive = message.loading('保存中...', { duration: 0 });
//   saving.value = true;
//   const { status, data } = await API.saveConfig(config.value);
//   if (status === 200) {
//     msgReactive.type = 'success';
//     msgReactive.content = '保存成功';
//     setTimeout(() => {
//       msgReactive.destroy();
//     }, 2000);
//     config.value = data;
//   } else {
//     msgReactive.type = 'error';
//     msgReactive.content = '保存失败';
//     setTimeout(() => {
//       msgReactive.destroy();
//     }, 2000);
//   }
//   saving.value = false;
// }

/**
 * 初始化表单
 */

configStore.getBotConfig();  // 初始化表单

const uiSchema = {
  subs: {
    users: {
      'ui:options': {
        addable: false,
      },
      items: {

        info: {
          "ui:field": UserInfo,
        },
        subscribes: {
          items: {
            dynamic: {
              "ui:field": Dynamic,
            }
          }
        }
      }
    }
  }
}
</script>

<template>
  <vue-form 
    v-model="configStore.config" 
    :schema="configStore.configSchema" 
    :ui-schema="uiSchema"
    @submit="configStore.saveBotConfig" 
    @cancel="configStore.rollbackConfig"
    @validation-failed="message.error('表单验证失败，请检查')" />
</template>