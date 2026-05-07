# 📋 AV.TVORKA - Deployment Checklist

## Pre-Deployment Checklist

### Environment Setup

- [ ] Create Supabase account at https://supabase.com
- [ ] Create new project in Supabase
- [ ] Copy Supabase URL
- [ ] Copy Supabase Anon Key
- [ ] Create `.env.local` file with credentials

### Database Setup

- [ ] Create `products` table in Supabase
- [ ] Run the SQL schema provided
- [ ] Add sample products
- [ ] Test product queries

### Local Testing

- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Test homepage loading
- [ ] Test product catalog
- [ ] Test language switching (UK/EN)
- [ ] Test currency switching (UAH/USD/EUR)
- [ ] Test adding product to cart
- [ ] Test adding to wishlist
- [ ] Test cart page
- [ ] Test checkout flow
- [ ] Test order success page
- [ ] Verify localStorage persistence

### Content Customization

- [ ] Add company logo (Header component)
- [ ] Update company name
- [ ] Customize primary color (#A8C686 in variables.scss)
- [ ] Update footer company info
- [ ] Add social media links
- [ ] Add contact information
- [ ] Add company description

### Product Data

- [ ] Add all products to Supabase
- [ ] Include product images
- [ ] Include descriptions in both languages
- [ ] Ensure prices are in UAH
- [ ] Add discount percentages if applicable
- [ ] Verify all categories are correct

### Testing in Production Build

- [ ] Run `npm run build`
- [ ] Run `npm run preview`
- [ ] Test all pages in production build
- [ ] Verify styles are applied
- [ ] Check performance metrics
- [ ] Test on mobile devices

### SEO & Meta Tags

- [ ] Update `index.html` title
- [ ] Add meta description
- [ ] Add Open Graph tags
- [ ] Update favicon

### Security

- [ ] Review Supabase RLS policies
- [ ] Ensure anon key has minimal permissions
- [ ] Plan for real payment integration
- [ ] Plan for authentication

### Performance

- [ ] Minimize image sizes
- [ ] Enable gzip compression
- [ ] Test Core Web Vitals
- [ ] Check lighthouse score

### Deployment

- [ ] Initialize Git repository
- [ ] Add `.gitignore` (node_modules, .env.local, dist)
- [ ] Commit code to GitHub
- [ ] Create GitHub repository
- [ ] Enable GitHub Pages
- [ ] Update `package.json` homepage if needed
- [ ] Run `npm run deploy`

### Post-Deployment

- [ ] Test deployed site on GitHub Pages
- [ ] Verify all links work
- [ ] Test cart functionality
- [ ] Test checkout
- [ ] Monitor for errors

---

## Database Configuration Details

### Supabase Row Level Security (RLS)

```sql
-- Allow anonymous users to read products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous to read products"
ON products
FOR SELECT
USING (true);
```

### Example Products SQL

```sql
INSERT INTO products (name_ukr, name_en, category_ukr, category_en, material_ukr, material_en, price, discount, img, description_ukr, description_en)
VALUES
  ('Ланцюжок Золотий', 'Golden Chain', 'Прикраси', 'Jewelry', 'Золото', 'Gold', 15000, 10, 'https://via.placeholder.com/300', 'Елегантний ланцюжок', 'Elegant chain'),
  ('Сумка Шкіряна', 'Leather Bag', 'Сумки', 'Bags', 'Шкіра', 'Leather', 25000, 0, 'https://via.placeholder.com/300', 'Ручна робота', 'Handmade'),
  ('Браслет Кольчужний', 'Chainmail Bracelet', 'Прикраси', 'Jewelry', 'Мідь', 'Copper', 5000, 20, 'https://via.placeholder.com/300', 'Традиційна техніка', 'Traditional technique');
```

---

## Configuration Files Reference

### `.env.local`

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### `vite.config.ts` (Already configured)

```typescript
export default defineConfig({
  plugins: [react()],
  base: "/av_tvorka_shop/",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
```

### `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  }
}
```

---

## Quick Reference Commands

### Development

```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build locally
```

### Deployment

```bash
npm run deploy          # Deploy to GitHub Pages
```

### Cleanup

```bash
rm -rf node_modules dist    # Remove build artifacts
npm install                 # Reinstall dependencies
```

---

## Performance Targets

- **Lighthouse Score**: > 90
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

---

## Browser Support

- ✓ Chrome (latest)
- ✓ Firefox (latest)
- ✓ Safari (latest)
- ✓ Edge (latest)
- ✓ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Troubleshooting

### Build fails with Node version error

```bash
# Use Node 18+ or downgrade vite
nvm install 18
nvm use 18
npm install
```

### Products not showing

```bash
# Check:
1. Supabase URL and key in .env.local
2. Database table created
3. Products inserted
4. Browser console for errors
```

### Cart/Wishlist not persisting

```bash
# Check:
1. localStorage is enabled
2. No localStorage quota exceeded
3. DevTools > Application > LocalStorage
```

### Deployment fails

```bash
# Check:
1. GitHub repository created
2. GitHub Pages enabled
3. package.json homepage matches
4. .env.local credentials present
```

---

## Support Resources

- 📖 [Supabase Documentation](https://supabase.com/docs)
- 📖 [React Documentation](https://react.dev)
- 📖 [Vite Documentation](https://vitejs.dev)
- 📖 [SCSS Documentation](https://sass-lang.com)
- 📖 [GitHub Pages Guide](https://pages.github.com)

---

## Next Steps After Launch

1. **Monitor Performance**
   - Set up analytics
   - Monitor error logs
   - Track user behavior

2. **Collect Feedback**
   - User testing
   - Bug reports
   - Feature requests

3. **Plan Improvements**
   - User authentication
   - Real payment integration
   - Real delivery APIs
   - Product management admin panel

4. **Marketing**
   - Set up email marketing
   - Social media integration
   - SEO optimization

---

**You're ready to launch! 🚀**

For detailed setup instructions, see `SETUP_GUIDE.md`
For quick start, see `QUICK_START.md`
For full implementation details, see `IMPLEMENTATION_SUMMARY.md`
