<script setup lang="ts">
import ConfigForm from '@/components/ConfigForm.vue';
import GlobalLoading from '@/components/GlobalLoading.vue';
</script>

<template>
  <global-loading />
  <header>
    <span>BiliChat</span>
  </header>
  <main>
    <config-form />
  </main>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 3.25rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
  background-color: #05aeec;
  padding: 0 1rem;
}

main {
  padding: 1rem;
  margin: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
}
</style>