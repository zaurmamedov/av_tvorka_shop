import { useLanguage } from "../hooks/useLanguage";
import "./Footer.scss";

export const Footer = () => {
  const { t, language } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <h3>{t("nav.logo")}</h3>
            <p>
              {language === "uk"
                ? "Елегантні ручні прикраси та аксесуари від AV.TVORKA"
                : "Elegant handmade jewelry and accessories from AV.TVORKA"}
            </p>
          </div>

          <div className="footer__section">
            <h4>{language === "uk" ? "Навігація" : "Navigation"}</h4>
            <ul>
              <li>
                <a href="/">{t("nav.home")}</a>
              </li>
              <li>
                <a href="/catalog">{t("nav.catalog")}</a>
              </li>
              <li>
                <a href="/jewelry">{t("nav.jewelry")}</a>
              </li>
              <li>
                <a href="/bags">{t("nav.bags")}</a>
              </li>
              <li>
                <a href="/accessories">{t("nav.accessories")}</a>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <h4>{language === "uk" ? "Контакти" : "Contacts"}</h4>
            <p>Email: info@avtvorka.com</p>
            <p>Phone: +380 (XX) XXX-XX-XX</p>
          </div>

          <div className="footer__section">
            <h4>{language === "uk" ? "Слідкуйте за нами" : "Follow Us"}</h4>
            <div className="footer__social">
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" aria-label="TikTok">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {currentYear} AV.TVORKA.{" "}
            {language === "uk" ? "Всі права захищені." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};
