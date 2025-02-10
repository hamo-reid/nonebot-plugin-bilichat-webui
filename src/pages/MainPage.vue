<script setup lang="ts">
import ConfigForm from '@/components/ConfigForm.vue';
import GlobalLoading from '@/components/GlobalLoading.vue';
import TokenDialog from '@/components/TokenDialog.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import { useGlobalStore, useConfigStore } from '@/store';
import { useMessage, NModalProvider } from 'naive-ui';

window.$message = useMessage();
console.log('main page', window.$message);

const globalStore = useGlobalStore();
const configStore = useConfigStore();
globalStore.getToken()
configStore.getConfigSchema()
</script>

<template>
  <div class="container">
    <global-loading />
    <header>
      <span>BiliChat</span>
    </header>
    <n-modal-provider>
      <main>
        <div class="sections">
          <section>
            <code-editor v-if="configStore.isGetConfigSchema" />
          </section>
          <section>
            <config-form v-if="configStore.isGetConfigSchema" />
          </section>
        </div>
      </main>
      <TokenDialog v-if="!globalStore.hasToken"></TokenDialog>
    </n-modal-provider>
  </div>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.25rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
  background-color: #05aeec;
  padding: 0 1rem;
}

main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;

  .sections {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
    width: 1200px;
  }

  section {
    flex: 1 1 calc(600px - 1rem);
    padding: 1rem;
    width: calc(600px - 1rem);
    max-width: 768x;
    background-color: #fff;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;

    &:first-child {
      margin-right: 1rem;
    }
  }

  @media screen and (max-width: 1200px) {
    section {
      margin-bottom: 1rem;
      margin: 0 1rem;
      max-width: 768px;
    }

    section:last-child {
      margin-bottom: 1rem;
    }
  }

  @media screen and (max-width: 768px) {
    section {
      width: calc(320px - 3rem);
      max-width: 100%;
      margin: 0 1rem;
    }
  }
}
</style>