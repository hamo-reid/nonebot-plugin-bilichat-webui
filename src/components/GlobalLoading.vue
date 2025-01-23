<script lang="ts" setup>
import { useGlobalStore } from '@/store';

const globalStore = useGlobalStore();

</script>

<template>
  <div class="loading" v-show="!globalStore.isGetConfigSchema">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
}

</style>