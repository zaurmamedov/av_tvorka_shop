import { useLanguage } from "../hooks/useLanguage";
import "./DeliveryPage.scss";

export const DeliveryPage = () => {
  const { t } = useLanguage();

  const deliveryPoints = [
    {
      title: t("delivery.cards.ukraine.title"),
      text: t("delivery.cards.ukraine.text"),
    },
    {
      title: t("delivery.cards.eu.title"),
      text: t("delivery.cards.eu.text"),
    },
    {
      title: t("delivery.cards.free.title"),
      text: t("delivery.cards.free.text"),
    },
  ];

  const steps = [
    t("delivery.steps.one"),
    t("delivery.steps.two"),
    t("delivery.steps.three"),
  ];

  return (
    <section className="delivery-page">
      <div className="container">
        <div className="delivery-page__hero">
          <span className="delivery-page__eyebrow">{t("delivery.eyebrow")}</span>
          <h1 className="delivery-page__title">{t("delivery.title")}</h1>
          <p className="delivery-page__subtitle">{t("delivery.subtitle")}</p>
        </div>

        <div className="delivery-page__grid">
          {deliveryPoints.map((item) => (
            <article key={item.title} className="delivery-page__card">
              <div className="delivery-page__icon" />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="delivery-page__details">
          <div className="delivery-page__panel">
            <h2>{t("delivery.process.title")}</h2>
            <div className="delivery-page__steps">
              {steps.map((step, index) => (
                <div key={step} className="delivery-page__step">
                  <span className="delivery-page__step-number">
                    0{index + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="delivery-page__panel delivery-page__panel--highlight">
            <h2>{t("delivery.note.title")}</h2>
            <p>{t("delivery.note.text")}</p>
            <div className="delivery-page__badge">
              {t("delivery.note.badge")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
