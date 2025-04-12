<template>
  <div class="home-page">
    <h1>Курсы валют</h1>
    <div v-if="currencyStore.loading">Загрузка курсов...</div>
    <div v-else-if="currencyStore.error">Ошибка загрузки курсов: {{ currencyStore.error }}</div>
    <div v-else>
      <p v-if="ratesForBase.USD">1 USD = {{ formatRate(1 / ratesForBase.USD) }} {{ currencyStore.baseCurrency }}</p>
      <p v-if="ratesForBase.EUR">1 EUR = {{ formatRate(1 / ratesForBase.EUR) }} {{ currencyStore.baseCurrency }}</p>
      <p v-if="Object.keys(ratesForBase).length === 0 && !currencyStore.loading && !currencyStore.error">
        Курсы для валюты {{ currencyStore.baseCurrency }} не найдены.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCurrencyStore } from '@/stores/currency';

const currencyStore = useCurrencyStore();

const ratesForBase = computed(() => {
  const base = currencyStore.baseCurrency.toLowerCase();
  const currentRates = currencyStore.rates;

  if (currentRates && currentRates[base]) {
    return {
      USD: currentRates[base].usd,
      EUR: currentRates[base].eur,
    };
  }
  return {};
});

const formatRate = (rate: number) => {
  return rate ? rate.toFixed(2) : 'N/A';
};

onMounted(() => {
  currencyStore.fetchRates();
});
</script>

<style scoped>
.home-page {
  padding: 20px;
}
</style>
