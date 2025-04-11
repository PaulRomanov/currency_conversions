import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Rates {
  [base: string]: {
    [target: string]: number;
  };
}

export const useCurrencyStore = defineStore('currency', () => {
  const baseCurrency = ref('RUB');
  const rates = ref<Rates | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchRates = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://status.neuralgeneration.com/api/currency');
      if (!response.ok) {
        throw new Error(`Ошибка получения курсов: ${response.status}`);
      }
      const data: { [key: string]: number } = await response.json();
      const newRates: Rates = {};

      for (const key in data) {
        const [from, to] = key.split('-');
        if (!newRates[from]) {
          newRates[from] = {};
        }
        newRates[from][to] = data[key];
      }
      console.log('Обработанные курсы:', newRates);
      rates.value = newRates;
    } catch (err: any) {
      error.value = err.message;
      console.error('Ошибка при получении курсов:', err.message);
    } finally {
      loading.value = false;
    }
  };

  const getRatesForBaseCurrency = () => {
    console.log('Запрошены курсы для базовой валюты:', baseCurrency.value);
    if (rates.value && rates.value[baseCurrency.value]) {
      const base = baseCurrency.value;
      return {
        USD: rates.value[base]?.USD,
        EUR: rates.value[base]?.EUR,
      };
    }
    return {};
  };

  const setBaseCurrency = (currency: string) => {
    baseCurrency.value = currency;
  };

  return {
    baseCurrency,
    rates,
    loading,
    error,
    fetchRates,
    getRatesForBaseCurrency,
    setBaseCurrency,
  };
});
