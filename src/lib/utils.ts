// Mock exchange rates
// In production, these should be fetched from a real API
const MOCK_RATES = {
  UAH: 1,
  USD: 0.025, // 1 UAH = 0.025 USD
  EUR: 0.023, // 1 UAH = 0.023 EUR
};

export const currencyUtils = {
  convert(priceUAH: number, fromCurrency: "UAH" | "USD" | "EUR"): number {
    if (fromCurrency === "UAH") return priceUAH;
    return Math.round(priceUAH * MOCK_RATES[fromCurrency] * 100) / 100;
  },

  format(price: number, currency: "UAH" | "USD" | "EUR"): string {
    const symbols = {
      UAH: "₴",
      USD: "$",
      EUR: "€",
    };

    return `${symbols[currency]}${price.toFixed(2)}`;
  },

  getExchangeRates() {
    return { ...MOCK_RATES };
  },

  // In production, replace this with a real API call
  async fetchExchangeRates() {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_RATES), 500);
    });
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
