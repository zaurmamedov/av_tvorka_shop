import { useLanguage } from "../hooks/useLanguage";
import "./CarePage.scss";

export const CarePage = () => {
  const { t } = useLanguage();

  const careSteps = [
    t("care.tips.one"),
    t("care.tips.two"),
    t("care.tips.three"),
    t("care.tips.four"),
    t("care.tips.five"),
    t("care.tips.six"),
  ];

  return (
    <section className="care-page">
      <div className="container">
        <div className="care-page__hero">
          <div className="care-page__hero-content">
            <span className="care-page__eyebrow">{t("care.eyebrow")}</span>
            <h1 className="care-page__title">{t("care.title")}</h1>
            <p className="care-page__subtitle">{t("care.subtitle")}</p>
          </div>

          <div className="care-page__hero-image" />
        </div>

        <div className="care-page__intro">
          <div className="care-page__notice">
            <span className="care-page__notice-mark">!</span>
            <p>{t("care.notice")}</p>
          </div>
        </div>

        <div className="care-page__layout">
          <div className="care-page__card">
            <h2>{t("care.material.title")}</h2>
            <p>{t("care.material.text")}</p>
          </div>

          <div className="care-page__card">
            <h2>{t("care.storage.title")}</h2>
            <p>{t("care.storage.text")}</p>
          </div>
        </div>

        <div className="care-page__tips">
          <div className="care-page__tips-header">
            <h2>{t("care.tips.title")}</h2>
            <p>{t("care.tips.subtitle")}</p>
          </div>

          <div className="care-page__tips-grid">
            {careSteps.map((tip, index) => (
              <article key={tip} className="care-page__tip">
                <span className="care-page__tip-number">0{index + 1}</span>
                <p>{tip}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
