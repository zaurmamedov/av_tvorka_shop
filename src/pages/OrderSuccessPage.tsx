import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import "./OrderSuccessPage.scss";

export const OrderSuccessPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>{t("orderSuccess.title")}</h1>
          <p>{t("orderSuccess.message")}</p>

          <div className="order-details">
            <div className="detail-item">
              <span className="label">{t("orderSuccess.orderNumber")}:</span>
              <span className="value">{orderId}</span>
            </div>
            <div className="detail-item">
              <span className="label">
                {language === "uk" ? "Дата" : "Date"}:
              </span>
              <span className="value">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <p className="info-text">
            {language === "uk"
              ? "Ми відправимо вам деталі замовлення на електронну пошту"
              : "We will send you order details via email"}
          </p>

          <div className="button-group">
            <button className="btn btn--primary" onClick={() => navigate("/")}>
              {language === "uk" ? "На головну" : "Back to Home"}
            </button>
            <button
              className="btn btn--outline"
              onClick={() => navigate("/catalog")}
            >
              {t("cart.continueShopping")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
