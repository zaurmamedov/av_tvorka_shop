import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { Language, Currency } from "../types";
import "./Header.scss";

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="header__top-content">
            <div className="header__logo">
              <h1>{t("nav.logo")}</h1>
            </div>

            <nav className="header__nav">
              <a href="/">{t("nav.home")}</a>
              <a href="/catalog">{t("nav.catalog")}</a>
              <a href="/jewelry">{t("nav.jewelry")}</a>
              <a href="/bags">{t("nav.bags")}</a>
              <a href="/accessories">{t("nav.accessories")}</a>
            </nav>

            <div className="header__actions">
              <div className="header__selector">
                <label htmlFor="language-select">{t("nav.language")}</label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="select"
                >
                  <option value="uk">UA</option>
                  <option value="en">EN</option>
                </select>
              </div>

              <div className="header__selector">
                <label htmlFor="currency-select">{t("nav.currency")}</label>
                <select
                  id="currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="select"
                >
                  <option value="UAH">UAH</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>

              <a href="/wishlist" className="header__icon">
                <span className="icon-heart">♡</span>
                {wishlist.length > 0 && (
                  <span className="header__badge">{wishlist.length}</span>
                )}
              </a>

              <a href="/cart" className="header__icon">
                <span className="icon-cart">🛒</span>
                {cart.totalQuantity > 0 && (
                  <span className="header__badge">{cart.totalQuantity}</span>
                )}
              </a>
            </div>

            <button
              className="header__menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__mobile-nav">
            <a href="/">{t("nav.home")}</a>
            <a href="/catalog">{t("nav.catalog")}</a>
            <a href="/jewelry">{t("nav.jewelry")}</a>
            <a href="/bags">{t("nav.bags")}</a>
            <a href="/accessories">{t("nav.accessories")}</a>
          </nav>
        </div>
      )}
    </header>
  );
};
