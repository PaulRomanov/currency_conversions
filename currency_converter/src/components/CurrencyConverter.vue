<template>
  <div class="currency-converter">
    <div class="converter-row">
      <select v-model="fromCurrency">
        <option value="RUB">RUB</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <input type="number" v-model.number="fromValue" @input="convertToToValue" />
    </div>
    <div class="converter-row">
      <select v-model="toCurrency">
        <option value="USD">USD</option>
        <option value="RUB">RUB</option>
        <option value="EUR">EUR</option>
      </select>
      <input type="number" v-model.number="toValue" @input="convertToFromValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCurrencyStore } from '@/stores/currency';

const currencyStore = useCurrencyStore();

const fromCurrency = ref('RUB');
const fromValue = ref<number | null>(null);
const toCurrency = ref('USD');
const toValue = ref<number | null>(null);

const convertToToValue = () => {
  if (fromValue.value !== null && currencyStore.rates && currencyStore.rates[fromCurrency.value.toLowerCase()] && currencyStore.rates[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()]) {
    const rate = currencyStore.rates[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    toValue.value = parseFloat((fromValue.value * rate).toFixed(2));
  } else {
    toValue.value = null;
  }
};

const convertToFromValue = () => {
  if (toValue.value !== null && currencyStore.rates && currencyStore.rates[toCurrency.value.toLowerCase()] && currencyStore.rates[toCurrency.value.toLowerCase()][fromCurrency.value.toLowerCase()]) {
    const rate = currencyStore.rates[toCurrency.value.toLowerCase()][fromCurrency.value.toLowerCase()];
    fromValue.value = parseFloat((toValue.value * rate).toFixed(2));
  } else {
    fromValue.value = null;
  }
};

watch(fromCurrency, () => {
  if (fromValue.value !== null) {
    convertToToValue();
  }
});

watch(toCurrency, () => {
  if (toValue.value !== null) {
    convertToFromValue();
  }
});

if (!currencyStore.rates) {
  currencyStore.fetchRates();
}
</script>

<style lang="scss" scoped>
.currency-converter {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
  }

  .converter-row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    select {
      padding: 8px;
      margin-right: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    input[type="number"] {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
}
</style>
