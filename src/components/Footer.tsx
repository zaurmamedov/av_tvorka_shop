import { Link, NavLink } from "react-router-dom";
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
            <NavLink to="/" end >
              <h3>{t("nav.logo")}</h3>
            </NavLink>
            <p>
              {language === "uk"
                ? "Елегантні ручні прикраси та аксесуари від AV.TVORKA"
                : "Elegant handmade jewellery and accessories from AV.TVORKA"}
            </p>
          </div>

          <div className="footer__section">
            <h4>{language === "uk" ? "Навігація" : "Navigation"}</h4>
            <ul>
              <Link to="/">{t("nav.home")}</Link>
              <Link to="/catalog">{t("nav.catalog")}</Link>
              {/* <Link to="/jewellery">{t("nav.jewellery")}</Link>
              <Link to="/bags">{t("nav.bags")}</Link>
              <Link to="/accessories">{t("nav.accessories")}</Link    > */}
              <Link to="/care">{t("nav.care")}</Link>
              <Link to="/delivery">{t("nav.delivery")}</Link>
            </ul>
          </div>

          {/* <div className="footer__section">
            <h4>{language === "uk" ? "Контакти" : "Contacts"}</h4>
            <p>Email: info@avtvorka.com</p>
            <p>Phone: +380 (XX) XXX-XX-XX</p>
          </div> */}

          <div className="footer__section">
            <h4>{language === "uk" ? "Слідкуйте за нами" : "Follow Us"}</h4>
            <div className="footer__social">
              <a
                href="https://www.instagram.com/av.tvorka?igsh=MWJmZ2E3eTAza2ww"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer">
                Instagram
              </a>
              <a
                href="https://www.facebook.com/av.tvorka"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer">
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@av.tvorka?_r=1&_t=ZS-96Lrwm3IoZo"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer">
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
