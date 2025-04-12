<template>
  <div class="convert-page">
    <h1>Конвертация валют</h1>
    <CurrencyConverter />
  </div>
</template>

<script setup lang="ts">
import CurrencyConverter from '@/components/CurrencyConverter.vue';
</script>

<style scoped>
.convert-page {
  padding: 20px;
}
</style>
