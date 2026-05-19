import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import type { Language, Currency } from "../types";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/auth.service";

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.removeProperty("overflow");
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await authService.signOut();
    closeMobileMenu();
  };

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
              {/* <Link to="/jewellery">{t("nav.jewellery")}</Link>
              <Link to="/bags">{t("nav.bags")}</Link>
              <Link to="/accessories">{t("nav.accessories")}</Link> */}
              <Link to="/care">{t("nav.care")}</Link>
              <Link to="/delivery">{t("nav.delivery")}</Link>
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

            <div className="header__desktop-auth">
              {user ? (
                <>
                  <span className="header__user-name">
                    {user.user_metadata?.full_name}
                  </span>
                  <button
                    type="button"
                    className="header__auth-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="header__auth-link">
                    Login
                  </Link>

                  <Link to="/register" className="header__auth-link">
                    Register
                  </Link>
                </>
              )}
            </div>

            <button
              className="header__menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`header__menu-icon ${mobileMenuOpen ? "is-open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="header__mobile-menu">
          <button
            type="button"
            className="header__mobile-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <span></span>
            <span></span>
          </button>
          <div className="header__mobile-menu-inner">
            <nav className="header__mobile-nav">
              <Link to="/" onClick={closeMobileMenu}>{t("nav.home")}</Link>
              <Link to="/catalog" onClick={closeMobileMenu}>{t("nav.catalog")}</Link>
            {/* <Link to="/jewellery">{t("nav.jewellery")}</Link>
            <Link to="/bags">{t("nav.bags")}</Link>
            <Link to="/accessories">{t("nav.accessories")}</Link> */}
              <Link to="/care" onClick={closeMobileMenu}>{t("nav.care")}</Link>
              <Link to="/delivery" onClick={closeMobileMenu}>{t("nav.delivery")}</Link>
              <Link to="/wishlist" onClick={closeMobileMenu}>{t("nav.wishlist")}</Link>
              <Link to="/cart" onClick={closeMobileMenu}>{t("nav.cart")}</Link>
              {user ? (
                <button
                  type="button"
                  className="header__mobile-auth"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={closeMobileMenu}>Login</Link>
                  <Link to="/register" onClick={closeMobileMenu}>Register</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
