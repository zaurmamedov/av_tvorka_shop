import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";
import { useCart } from "../hooks/useCart";
import { DeliveryMethod, PaymentMethod, OrderCustomer, Order } from "../types";
import { currencyUtils, deliveryUtils } from "../lib/utils";
import "./CheckoutPage.scss";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { currency, exchangeRates } = useCurrency();
  const { cart, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState<OrderCustomer>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    DeliveryMethod.NOVA_POSHTA,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH_ON_DELIVERY,
  );
  const [loading, setLoading] = useState(false);

  const subtotal = cartTotal(currency, exchangeRates);
  const delivery = deliveryUtils.calculateDeliveryPrice(
    deliveryMethod.toLowerCase() as "nova_poshta" | "ukrposhta" | "courier",
    cart.totalPriceUAH,
  );
  const deliveryPriceConverted = currencyUtils.convert(
    delivery.price,
    currency,
  );
  const total = subtotal + deliveryPriceConverted;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name || !formData.phone || !formData.address) {
      alert(
        language === "uk"
          ? "Заповніть всі обов'язкові поля"
          : "Please fill all required fields",
      );
      setLoading(false);
      return;
    }

    try {
      // In a real app, this would send data to backend
      const order: Order = {
        id: `ORD-${Date.now()}`,
        items: cart.items,
        customer: formData,
        totalPriceUAH: cart.totalPriceUAH + delivery.price,
        deliveryMethod,
        deliveryPrice: delivery.price,
        paymentMethod,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      console.log("Order created:", order);

      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear cart and navigate to success page
      clearCart();
      navigate(`/order-success/${order.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      alert(
        language === "uk"
          ? "Помилка при оформленні замовлення"
          : "Error placing order",
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container py-3">
        <div className="empty-cart">
          <h1>{t("checkout.title")}</h1>
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

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-page__title">{t("checkout.title")}</h1>

        <div className="checkout-page__layout">
          {/* Checkout Form */}
          <div className="checkout-page__form">
            <form onSubmit={handleSubmitOrder}>
              {/* Customer Info */}
              <fieldset>
                <legend>{t("checkout.customerInfo")}</legend>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    {t("checkout.name")} <span className="required">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    {t("checkout.phone")} <span className="required">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="+380"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    {t("checkout.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    {t("checkout.address")} <span className="required">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="textarea"
                    required
                  ></textarea>
                </div>
              </fieldset>

              {/* Delivery Method */}
              <fieldset>
                <legend>{t("checkout.deliveryMethod")}</legend>

                {Object.values(DeliveryMethod).map((method) => (
                  <label key={method} className="checkbox-label">
                    <input
                      type="radio"
                      name="delivery"
                      value={method}
                      checked={deliveryMethod === method}
                      onChange={() => setDeliveryMethod(method)}
                    />
                    <span>
                      {t(`checkout.deliveryMethod.${method.toLowerCase()}`)}
                    </span>
                  </label>
                ))}
              </fieldset>

              {/* Payment Method */}
              <fieldset>
                <legend>{t("checkout.paymentMethod")}</legend>

                {Object.values(PaymentMethod).map((method) => (
                  <label key={method} className="checkbox-label">
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <span>
                      {t(`checkout.paymentMethod.${method.toLowerCase()}`)}
                    </span>
                  </label>
                ))}
              </fieldset>

              <button
                type="submit"
                className="btn btn--primary btn--block btn--lg"
                disabled={loading}
              >
                {loading ? t("common.loading") : t("checkout.placeOrder")}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <aside className="checkout-page__summary">
            <div className="order-summary">
              <h3>{t("checkout.orderSummary")}</h3>

              <div className="summary-items">
                {cart.items.map((item) => {
                  const name =
                    language === "uk"
                      ? item.product.name_ukr
                      : item.product.name_en;
                  const discountedPrice =
                    item.product.price * (1 - item.product.discount / 100);
                  const convertedPrice = currencyUtils.convert(
                    Math.round(discountedPrice),
                    currency,
                  );

                  return (
                    <div key={item.productId} className="summary-item">
                      <div className="item-name">
                        {name}{" "}
                        <span className="item-qty">x{item.quantity}</span>
                      </div>
                      <div className="item-price">
                        {currencyUtils.format(
                          convertedPrice * item.quantity,
                          currency,
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-item">
                <span>{t("cart.subtotal")}:</span>
                <span>{currencyUtils.format(subtotal, currency)}</span>
              </div>

              <div className="summary-item">
                <span>{t("cart.shipping")}:</span>
                <span>
                  {delivery.isFree
                    ? t("checkout.freeDelivery")
                    : currencyUtils.format(deliveryPriceConverted, currency)}
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-item total">
                <span>{t("cart.total")}:</span>
                <span>{currencyUtils.format(total, currency)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
