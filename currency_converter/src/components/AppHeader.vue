<template>
  <header class="header">
    <div class="header__left">
      <router-link to="/" class="header__logo-link">Currency Converter</router-link>
    </div>
    <div class="header__right">
      <nav>
        <router-link to="/" class="header__link" active-class="router-link-active">Главная</router-link>
        <router-link to="/convert" class="header__link" active-class="router-link-active">Конвертация</router-link>
      </nav>
      <select
        class="header__currency-select"
        v-model="currentCurrency"
        @change="updateBaseCurrency"
      >
        <option value="RUB">RUB</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCurrencyStore } from '@/stores/currency';
import { onMounted, watch } from 'vue';

const currencyStore = useCurrencyStore();
const currentCurrency = ref(currencyStore.baseCurrency);

const updateBaseCurrency = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  currencyStore.setBaseCurrency(target.value);
  currentCurrency.value = target.value;
};

watch(() => currencyStore.baseCurrency, (newBaseCurrency) => {
  currentCurrency.value = newBaseCurrency;
});

onMounted(() => {
  currencyStore.fetchRates();
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: $color-secondary;
  color: $color-font-primary;

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  &__logo-link {
    font-size: 24px;
    font-weight: bold;
    margin-right: 16px;
    color: $color-font-primary;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: $color-accent-light;
    }
  }

  nav {
    margin-right: 20px;
  }

  &__link {
    font-size: 18px;
    color: $color-accent;
    text-decoration: none;
    margin-left: 15px;
    transition: color 0.3s ease;

    &.router-link-active {
      color: $color-accent-light;
      font-weight: bold;
    }

    &:hover {
      color: $color-accent-light;
    }
  }

  &__currency-select {
    padding: 8px 12px;
    border: 1px solid $color-quaternary;
    border-radius: 4px;
    background-color: $color-tertiary;
    color: $color-font-primary;
    font-size: 16px;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: $color-accent;
    }
  }
}
</style>
