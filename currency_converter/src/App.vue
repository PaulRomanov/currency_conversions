<template>
  <AppHeader />
  <router-view></router-view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
</script>

<style lang="scss">
@import '@/assets/styles/_variables.scss';

body {
  font-family: $font-family-main, sans-serif;
  background-color: $color-primary-bg;
  color: $color-font-primary;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
