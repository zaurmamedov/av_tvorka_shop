import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import {
  DeliveryMethod,
  PaymentMethod,
  type OrderCustomer,
} from "../types";
import { supabase } from "../lib/supabase";
import { currencyUtils } from "../lib/utils";
import { ordersService } from "../services/orders.service";
import "./CheckoutPage.scss";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  const { currency, exchangeRates } = useCurrency();
  const { cart, cartTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState<OrderCustomer>({
    name: "",
    phone: "",
    email: user?.email || "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    DeliveryMethod.NOVA_POSHTA,
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH_ON_DELIVERY,
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    let isMounted = true;
    const metadata = user.user_metadata || {};

    setFormData((prev) => ({
      name: prev.name || metadata.full_name || "",
      phone: prev.phone || metadata.phone || "",
      email: prev.email || user.email || "",
    }));

    const prefillCustomerData = async () => {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", user.id)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      setFormData((prev) => ({
        name: prev.name || profileData?.full_name || metadata.full_name || "",
        phone: prev.phone || profileData?.phone || metadata.phone || "",
        email: prev.email || user.email || "",
      }));
    };

    void prefillCustomerData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (authLoading) {
    return <p>{t("common.loading")}</p>;
  }

  if (!user) {
    return <Navigate to="/auth-required" replace state={{ from: location }} />;
  }

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

  const subtotal = cartTotal(currency, exchangeRates);
  const total = subtotal;

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

    if (!formData.name || !formData.phone) {
      alert(
        language === "uk"
          ? "Заповніть всі обов'язкові поля"
          : "Please fill all required fields",
      );
      return;
    }

    try {
      setLoading(true);

      const order = await ordersService.createOrder({
        total,
        customerEmail: user.email,
        items: cart.items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.product.price,
          name_ukr: item.product.name_ukr,
          name_en: item.product.name_en,
          image: item.product.img,
        })),
        customer: formData,
        deliveryMethod,
        deliveryPrice: 0,
        paymentMethod,
        currency,
      });

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

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-page__title">{t("checkout.title")}</h1>

        <div className="checkout-page__layout">
          <div className="checkout-page__form">
            <form onSubmit={handleSubmitOrder}>
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
              </fieldset>

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

          <aside className="checkout-page__summary">
            <div className="order-summary">
              <h3>{t("checkout.orderSummary")}</h3>

              <div className="summary-items">
                {cart.items.map((item) => {
                  const name =
                    language === "uk"
                      ? item.product.name_ukr
                      : item.product.name_en;

                  const discount = item.product.discount || 0;

                  const discountedPrice =
                    item.product.price * (1 - discount / 100);

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

              <div className="summary-divider" />

              {/* <div className="summary-item">
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

              <div className="summary-divider" /> */}

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
