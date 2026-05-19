// Language and internationalization
export type Language = "uk" | "en";

// Currency types
export type Currency = "UAH" | "USD" | "EUR";

export interface ExchangeRate {
  currency: Currency;
  rate: number;
}

// Product types
export interface Product {
  id: string;
  created_at: string;
  name_ukr: string;
  name_en: string;
  category_ukr: string;
  category_en: string;
  material_ukr: string;
  material_en: string;
  price: number; // Always in UAH
  discount: number; // Percentage (0-100)
  img: string;
  description_ukr: string;
  description_en: string;
}

export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  material?: string;
  discount?: boolean;
}

export enum SortOption {
  NEWEST = "newest",
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  POPULARITY = "popularity",
}

// Cart types
export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalPriceUAH: number;
}

// Wishlist types
export type Wishlist = string[]; // Array of product IDs

// Order types
export enum DeliveryMethod {
  NOVA_POSHTA = "nova_poshta",
  UKRPOSHTA = "ukrposhta",
  COURIER = "courier",
}

export enum PaymentMethod {
  CARD = "card",
  CASH_ON_DELIVERY = "cash_on_delivery",
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: OrderCustomer;
  totalPriceUAH: number;
  deliveryMethod: DeliveryMethod;
  deliveryPrice: number;
  paymentMethod: PaymentMethod;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  created_at: string;
}

// Context types
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface CurrencyContextType {
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  exchangeRates: Record<Currency, number>;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: (currency: Currency, rates: Record<Currency, number>) => number;
}

export interface WishlistContextType {
  wishlist: Wishlist;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}
