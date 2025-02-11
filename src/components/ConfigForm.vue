<script setup lang="ts">
import { defineComponent } from 'vue';
import { useConfigStore } from '@/store';
import { useMessage } from 'naive-ui';
import UserInfo from '@/components/fields/UserInfo.vue';
import Dynamic from '@/components/fields/Dynamic.vue';
import ListItem from '@/components/fields/common/ListItem.vue';
defineComponent({
  name: 'ConfigForm',
  components: { UserInfo },
})
const configStore = useConfigStore();
const message = useMessage();

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
        "ui:field": ListItem,
        info: {
          "ui:field": UserInfo,
        },
        subscribes: {
          items: {
            "ui:field": ListItem,
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