# AV.TVORKA - Premium E-Commerce Store

A production-ready e-commerce website built with React, TypeScript, SCSS, and Supabase.

## Features

✨ **Multi-Language Support**

- Ukrainian (UK) and English (EN)
- Full site translation including product names, descriptions, and UI elements
- Language persistence in localStorage

💱 **Multi-Currency Support**

- UAH, USD, EUR
- Real-time currency conversion
- Dynamic price updates
- Currency persistence in localStorage

🛒 **Complete E-Commerce System**

- Product catalog with filtering and sorting
- Advanced product search
- Product categories (Jewelry, Bags, Accessories)
- Wishlist system with persistence
- Shopping cart with quantity management
- One-click checkout
- Order management

🎨 **Premium Design**

- Elegant, minimalistic jewelry store aesthetic
- Responsive mobile-first design
- Smooth animations and transitions
- Professional SCSS component system

🔐 **Backend Integration**

- Supabase integration for products and data
- Scalable database structure
- Mock payment/delivery systems

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **SCSS** - Styling with variables and mixins
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Supabase** - Backend & Database

## Project Structure

```
src/
├── app/                 # App configuration
├── components/          # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── ProductCard.tsx
│   └── *.scss
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── CatalogPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── WishlistPage.tsx
│   ├── CheckoutPage.tsx
│   ├── OrderSuccessPage.tsx
│   ├── CategoryPage.tsx
│   └── *.scss
├── hooks/              # Custom React hooks (Context providers)
│   ├── useLanguage.tsx
│   ├── useCurrency.tsx
│   ├── useCart.tsx
│   └── useWishlist.tsx
├── services/           # API/Supabase services
│   └── products.service.ts
├── lib/                # Utilities and helpers
│   ├── supabase.ts
│   ├── translations.ts
│   └── utils.ts
├── types/              # TypeScript types
│   └── index.ts
├── styles/             # Global SCSS
│   ├── variables.scss
│   ├── global.scss
│   └── components.scss
├── main.tsx           # Entry point
└── App.tsx            # Main app component
```

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd av_tvorka_shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Then fill in your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Setup Supabase Database

Create a `products` table in your Supabase project with the following structure:

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  name_ukr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  category_ukr TEXT NOT NULL,
  category_en TEXT NOT NULL,
  material_ukr TEXT NOT NULL,
  material_en TEXT NOT NULL,
  price INT8 NOT NULL,
  discount INT8 DEFAULT 0,
  img TEXT,
  description_ukr TEXT,
  description_en TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_products_category_ukr ON products(category_ukr);
CREATE INDEX idx_products_category_en ON products(category_en);
CREATE INDEX idx_products_price ON products(price);
```

### 5. Insert sample data

```sql
INSERT INTO products (name_ukr, name_en, category_ukr, category_en, material_ukr, material_en, price, discount, img, description_ukr, description_en)
VALUES
  ('Ланцюжок Золотий', 'Golden Chain', 'Прикраси', 'Jewelry', 'Золото', 'Gold', 15000, 10, 'https://via.placeholder.com/300x300?text=Chain', 'Елегантний ланцюжок з перевіреного золота', 'Elegant chain made from verified gold'),
  ('Сумка Шкіряна', 'Leather Bag', 'Сумки', 'Bags', 'Шкіра', 'Leather', 25000, 0, 'https://via.placeholder.com/300x300?text=Bag', 'Ручна робота з натуральної шкіри', 'Handmade genuine leather bag'),
  ('Браслет Кольчужний', 'Chainmail Bracelet', 'Прикраси', 'Jewelry', 'Мідь', 'Copper', 5000, 20, 'https://via.placeholder.com/300x300?text=Bracelet', 'Традиційна техніка кольчуги', 'Traditional chainmail technique');
```

## Development

### Start development server

```bash
npm run dev
```

Server will run at `http://localhost:5173`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Architecture

### Context Providers (Global State)

1. **LanguageProvider** - Manages language state and translations
   - Persists to localStorage
   - Provides `useLanguage()` hook

2. **CurrencyProvider** - Manages currency and exchange rates
   - Handles currency conversion
   - Persists to localStorage
   - Provides `useCurrency()` hook

3. **CartProvider** - Manages shopping cart
   - Persists to localStorage
   - Handles add/remove/update operations
   - Calculates totals
   - Provides `useCart()` hook

4. **WishlistProvider** - Manages wishlist
   - Persists to localStorage
   - Provides `useWishlist()` hook

### Services

**Products Service** (`services/products.service.ts`)

- `getAllProducts()` - Fetch all products
- `getProductById(id)` - Get single product
- `getProductsByCategory(category)` - Filter by category
- `getProductsByMaterial(material)` - Filter by material
- `searchProducts(query)` - Search products

### Utilities

**Currency Utils** (`lib/utils.ts`)

- `convert()` - Convert prices between currencies
- `format()` - Format prices with symbols
- `getExchangeRates()` - Get current rates

**Price Utils**

- `calculateDiscount()` - Apply discount percentage
- `calculateTotalPrice()` - Sum cart totals

**Delivery Utils**

- `calculateDeliveryPrice()` - Calculate shipping based on method and total

## Pages & Routes

| Route                     | Component         | Description                              |
| ------------------------- | ----------------- | ---------------------------------------- |
| `/`                       | HomePage          | Hero section + featured products         |
| `/catalog`                | CatalogPage       | All products with filters & sorting      |
| `/jewelry`                | CategoryPage      | Jewelry category                         |
| `/bags`                   | CategoryPage      | Bags category                            |
| `/accessories`            | CategoryPage      | Accessories category                     |
| `/product/:id`            | ProductDetailPage | Detailed product view + related products |
| `/cart`                   | CartPage          | Shopping cart view                       |
| `/wishlist`               | WishlistPage      | User's wishlist                          |
| `/checkout`               | CheckoutPage      | Order form + summary                     |
| `/order-success/:orderId` | OrderSuccessPage  | Order confirmation                       |

## Styling System

### SCSS Architecture

**variables.scss** - Color palette, spacing, typography, breakpoints
**global.scss** - Base styles, reset, scrollbar customization
**components.scss** - Reusable component classes (buttons, inputs, forms, etc.)

### Color System

- Primary: `#A8C686` (soft pastel green)
- Text Primary: `#2C2C2C`
- Background: `#FAFAF8`
- Surface: `#FFFFFF`
- Borders: `#E8E8E6`

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

## Translations

All translations are managed in `lib/translations.ts`:

```typescript
t("nav.logo"); // Returns translated text
t("product.addToCart"); // Automatically uses current language
```

### Adding New Translations

1. Open `src/lib/translations.ts`
2. Add key to both `uk` and `en` objects
3. Use `t('key')` in components

## Currency System

Exchange rates are fetched from `lib/utils.ts` (currently mocked).

To use real rates, replace the mock API in `currencyUtils.fetchExchangeRates()`.

### Converting Prices

```typescript
import { currencyUtils } from "../lib/utils";

const priceInUAH = 1000;
const priceInUSD = currencyUtils.convert(priceInUAH, "USD");
const formatted = currencyUtils.format(priceInUSD, "USD"); // "$25.00"
```

## Cart & Wishlist Persistence

Both cart and wishlist are persisted to localStorage automatically:

- **Cart key**: `cart`
- **Wishlist key**: `wishlist`
- **Language key**: `language`
- **Currency key**: `currency`

## Performance Optimizations

- Code splitting with React Router
- Image optimization via placeholders
- Lazy loading with React.lazy (can be added)
- Memoization for expensive operations
- Debounced filters

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

- Supabase anon key is public (Row Level Security should be configured)
- All sensitive operations should use authenticated backend
- Payment integration should use server-side validation
- Delivery calculations are mock and should use real APIs

## Future Enhancements

- [ ] User authentication
- [ ] Order history
- [ ] Real payment integration (Stripe, etc.)
- [ ] Real delivery APIs
- [ ] Product reviews & ratings
- [ ] Analytics tracking
- [ ] Advanced search
- [ ] Product variants (size, color)
- [ ] Email notifications
- [ ] Admin panel

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Support

For issues or questions, please open an issue on the repository.

---

Made with ❤️ by AV.TVORKA Team
