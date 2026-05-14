import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import type { Language, Currency } from "../types";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";

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
            <NavLink to="/" end className="header__logo">
              <h1>{t("nav.logo")}</h1>
            </NavLink>

            <nav className="header__nav">
              <Link to="/">{t("nav.home")}</Link>
              <Link to="/catalog">{t("nav.catalog")}</Link>
              <Link to="/jewellery">{t("nav.jewellery")}</Link>
              <Link to="/bags">{t("nav.bags")}</Link>
              <Link to="/accessories">{t("nav.accessories")}</Link    >
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

              <Link to="/wishlist" className="header__icon">
                <span className="icon-heart">♡</span>
                {wishlist.length > 0 && (
                  <span className="header__badge">{wishlist.length}</span>
                )}
              </Link>

              <NavLink to="/cart" end className="header__icon">
                <span className="icon-cart">🛒</span>
                {cart.totalQuantity > 0 && (
                  <span className="header__badge">{cart.totalQuantity}</span>
                )}
              </NavLink>
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
            <Link to="/">{t("nav.home")}</Link>
            <Link to="/catalog">{t("nav.catalog")}</Link>
            <Link to="/jewellery">{t("nav.jewellery")}</Link>
            <Link to="/bags">{t("nav.bags")}</Link>
            <Link to="/accessories">{t("nav.accessories")}</Link>
          </nav>
        </div>
      )}
    </header>
  );
};
