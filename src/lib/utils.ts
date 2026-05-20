import type { Currency } from "../types";

const FRANKFURTER_API_URL =
  "https://api.frankfurter.dev/v2/rates?base=UAH&quotes=USD,EUR";

const MOCK_RATES: Record<Currency, number> = {
  UAH: 1,
  USD: 0.025, // 1 UAH = 0.023 USD
  EUR: 0.023, // 1 UAH = 0.020 EUR
};

let currentRates: Record<Currency, number> = { ...MOCK_RATES };

type FrankfurterResponse = {
  base?: string;
  date?: string;
  quote?: Exclude<Currency, "UAH">;
  rate?: number;
};

export const currencyUtils = {
  convert(
    priceUAH: number,
    currency: Currency,
    exchangeRates: Record<Currency, number> = currentRates,
  ): number {
    if (currency === "UAH") return priceUAH;
    return Math.round(priceUAH * exchangeRates[currency] * 100) / 100;
  },

  format(price: number, currency: Currency): string {
    const symbols = {
      UAH: "₴",
      USD: "$",
      EUR: "€",
    };

    return `${symbols[currency]}${price.toFixed(2)}`;
  },

  getExchangeRates() {
    return { ...currentRates };
  },

  async fetchExchangeRates() {
    try {
      const response = await fetch(FRANKFURTER_API_URL);

      if (!response.ok) {
        throw new Error(`Frankfurter API request failed with ${response.status}`);
      }

      const data = (await response.json()) as FrankfurterResponse[];

      if (!Array.isArray(data)) {
        throw new Error("Frankfurter API returned an unexpected response");
      }

      const usdRate = data.find((item) => item.quote === "USD");
      const eurRate = data.find((item) => item.quote === "EUR");

      currentRates = {
        UAH: 1,
        USD: Number(usdRate?.rate) || MOCK_RATES.USD,
        EUR: Number(eurRate?.rate) || MOCK_RATES.EUR,
      };

      return { ...currentRates };
    } catch {
      if (import.meta.env.DEV) {
        console.warn(
          "Failed to fetch live exchange rates from Frankfurter. Falling back to mock rates.",
        );
      }
      currentRates = { ...MOCK_RATES };
      return { ...currentRates };
    }
  },
};

export const priceUtils = {
  calculateDiscount(price: number, discount: number): number {
    return Math.round(price * (1 - discount / 100));
  },

  calculateTotalPrice(
    items: Array<{ price: number; quantity: number; discount: number }>,
  ): number {
    return items.reduce((total, item) => {
      const discountedPrice = this.calculateDiscount(item.price, item.discount);
      return total + discountedPrice * item.quantity;
    }, 0);
  },
};

export const deliveryUtils = {
  calculateDeliveryPrice(
    method: "nova_poshta" | "ukrposhta" | "courier",
    orderTotal: number,
    isFreeDeliveryThreshold = 2000,
  ): { price: number; isFree: boolean } {
    // Free delivery above threshold
    if (orderTotal >= isFreeDeliveryThreshold) {
      return { price: 0, isFree: true };
    }

    const basePrices = {
      nova_poshta: 80,
      ukrposhta: 70,
      courier: 150,
    };

    return {
      price: basePrices[method],
      isFree: false,
    };
  },
};
