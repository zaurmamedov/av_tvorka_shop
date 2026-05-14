import { Link } from "react-router-dom";
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
              <Link to="/">{t("nav.home")}</Link>
              <Link to="/catalog">{t("nav.catalog")}</Link>
              <Link to="/jewellery">{t("nav.jewellery")}</Link>
              <Link to="/bags">{t("nav.bags")}</Link>
              <Link to="/accessories">{t("nav.accessories")}</Link    >
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
