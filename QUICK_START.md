# AV.TVORKA - Quick Start Guide

## ⚡ 30-Second Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

- Copy your Supabase URL and Anon Key
- Update `.env.local` with your credentials:

```
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
```

### 3. Create Database

Run this SQL in your Supabase dashboard:

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
```

### 4. Add Sample Data

```sql
INSERT INTO products (name_ukr, name_en, category_ukr, category_en, material_ukr, material_en, price, discount, img, description_ukr, description_en)
VALUES
  ('Ланцюжок Золотий', 'Golden Chain', 'Прикраси', 'Jewelry', 'Золото', 'Gold', 15000, 10, 'https://via.placeholder.com/300x300?text=Chain', 'Елегантний ланцюжок', 'Elegant chain'),
  ('Сумка Шкіряна', 'Leather Bag', 'Сумки', 'Bags', 'Шкіра', 'Leather', 25000, 0, 'https://via.placeholder.com/300x300?text=Bag', 'Ручна робота', 'Handmade'),
  ('Браслет', 'Bracelet', 'Прикраси', 'Jewelry', 'Мідь', 'Copper', 5000, 20, 'https://via.placeholder.com/300x300?text=Bracelet', 'Кольчуга', 'Chainmail');
```

### 5. Start Development

```bash
npm run dev
```

Visit `http://localhost:5173`

## 🚀 Build & Deploy

### Build

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 📚 Key Features

✅ Multi-language (UK/EN)
✅ Multi-currency (UAH/USD/EUR)
✅ Shopping cart with persistence
✅ Wishlist system
✅ Product filtering & sorting
✅ Checkout flow
✅ Responsive design
✅ Production-ready code

## 🎯 File Structure Overview

```
src/
├── hooks/           # Context providers (Language, Currency, Cart, Wishlist)
├── services/        # Supabase API
├── pages/           # Page components (Home, Catalog, Cart, etc.)
├── components/      # Reusable components (Header, Footer, ProductCard)
├── lib/             # Utilities & translations
├── types/           # TypeScript types
├── styles/          # SCSS (variables, global, components)
└── App.tsx          # Main app with routing
```

## 🔑 Key Hooks (Global State)

```typescript
import { useLanguage } from "./hooks/useLanguage";
import { useCurrency } from "./hooks/useCurrency";
import { useCart } from "./hooks/useCart";
import { useWishlist } from "./hooks/useWishlist";

// In any component:
const { language, t } = useLanguage(); // Get language & translate
const { currency, setCurrency } = useCurrency(); // Switch currency
const { cart, addToCart } = useCart(); // Manage cart
const { addToWishlist } = useWishlist(); // Manage wishlist
```

## 💡 Common Tasks

### Add Translation

Edit `src/lib/translations.ts` and add to both `uk` and `en` objects.

### Add Product Filtering

Edit `src/pages/CatalogPage.tsx` - filters are already implemented!

### Modify Colors

Edit `src/styles/variables.scss` - change `$primary`, `$background`, etc.

### Add New Page

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Header.tsx`

## 🐛 Troubleshooting

### Products not loading?

- Check Supabase URL and key in `.env.local`
- Verify table is named `products`
- Check browser console for errors

### Styles not applying?

- SCSS is imported in `main.tsx` and `App.tsx`
- Vite auto-refreshes with HMR

### Cart not persisting?

- Check localStorage is enabled
- Verify CartProvider wraps app (it does in App.tsx)

## 📖 Documentation

For detailed setup and architecture, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## ✨ Next Steps

1. ✅ Install & setup
2. ✅ Connect Supabase
3. ✅ Test locally
4. ⬜ Customize colors & fonts
5. ⬜ Add more products
6. ⬜ Deploy to production

Happy coding! 🎉
