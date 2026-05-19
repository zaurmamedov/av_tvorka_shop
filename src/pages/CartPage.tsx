import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";
import { useCart } from "../hooks/useCart";
import { currencyUtils, priceUtils } from "../lib/utils";
import "./CartPage.scss";

export const CartPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { currency, exchangeRates } = useCurrency();
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="container py-3">
        <div className="empty-cart">
          <h1>{t("cart.title")}</h1>
          <p>{t("cart.empty")}</p>
          <button
            className="btn btn--primary"
            onClick={() => navigate("/catalog")}
          >
            {t("cart.continueShopping")}
          </button>
        </div>
      </div>
    );
  }

  const total = cartTotal(currency, exchangeRates);

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-page__title">{t("cart.title")}</h1>

        <div className="cart-page__layout">
          {/* Cart Items */}
          <div className="cart-page__items">
            <div className="cart-table">
              <div className="cart-table__header">
                <div className="col-product">{t("cart.product")}</div>
                <div className="col-price">{t("cart.price")}</div>
                <div className="col-quantity">{t("cart.quantity")}</div>
                <div className="col-total">{t("cart.total")}</div>
                <div className="col-action"></div>
              </div>

              {cart.items.map((item) => {
                const discountedPrice = priceUtils.calculateDiscount(
                  item.product.price,
                  item.product.discount,
                );
                const convertedPrice = currencyUtils.convert(
                  discountedPrice,
                  currency,
                );
                const itemTotal = convertedPrice * item.quantity;

                return (
                  <div key={item.productId} className="cart-table__row">
                    <div className="col-product">
                      <div className="product-info">
                        <img
                          src={
                            item.product.img ||
                            "https://via.placeholder.com/80x80"
                          }
                          alt={
                            language === "uk"
                              ? item.product.name_ukr
                              : item.product.name_en
                          }
                          className="product-info__image"
                        />
                        <div>
                          <h4>
                            {language === "uk"
                              ? item.product.name_ukr
                              : item.product.name_en}
                          </h4>
                          {item.product.discount > 0 && (
                            <span className="discount-badge">
                              -{item.product.discount}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-price">
                      {currencyUtils.format(convertedPrice, currency)}
                    </div>
                    <div className="col-quantity">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.productId,
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        min="1"
                        className="input"
                      />
                    </div>
                    <div className="col-total">
                      {currencyUtils.format(itemTotal, currency)}
                    </div>
                    <div className="col-action">
                      <button
                        className="btn-remove"
                        onClick={() => removeFromCart(item.productId)}
                        title={t("common.remove")}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart Summary */}
          <aside className="cart-page__summary">
            <div className="order-summary">
              <h3>{t("cart.checkout")}</h3>

              <div className="summary-item">
                <span>{t("cart.subtotal")}:</span>
                <span>{currencyUtils.format(total, currency)}</span>
              </div>

              {/* <div className="summary-item">
                <span>{t("cart.shipping")}:</span>
                <span>{t("checkout.freeDelivery")}</span>
              </div> */}

              <div className="summary-divider"></div>

              <div className="summary-item total">
                <span>{t("cart.total")}:</span>
                <span>{currencyUtils.format(total, currency)}</span>
              </div>

              <button
                className="btn btn--primary btn--block btn--lg"
                onClick={() => navigate("/checkout")}
              >
                {t("checkout.title")}
              </button>

              <button
                className="btn btn--outline btn--block"
                onClick={() => navigate("/catalog")}
              >
                {t("cart.continueShopping")}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
