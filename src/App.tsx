import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./hooks/useLanguage";
import { CurrencyProvider } from "./hooks/useCurrency";
import { CartProvider } from "./hooks/useCart";
import { WishlistProvider } from "./hooks/useWishlist";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { WishlistPage } from "./pages/WishlistPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { JewelleryPage } from "./pages/JewelleryPage";
import { BagsPage } from "./pages/BagsPage";
import { AccessoriesPage } from "./pages/AccessoriesPage";
import "./styles/global.scss";
import "./styles/components.scss";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            <Router basename="/av_tvorka_shop">
              <Layout>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/jewellery" element={<JewelleryPage />} />
                  <Route path="/bags" element={<BagsPage />} />
                  <Route path="/accessories" element={<AccessoriesPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route
                    path="/order-success/:orderId"
                    element={<OrderSuccessPage />}
                  />
                </Routes>
              </Layout>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;
