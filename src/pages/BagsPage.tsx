import { useLanguage } from "../hooks/useLanguage";
import { CategoryPageTemplate } from "../components/CategoryPageTemplate";

export const BagsPage = () => {
  const { t, language } = useLanguage();

  return (
    <CategoryPageTemplate
      category="bags"
      title={t("nav.bags")}
      description={
        language === "uk"
          ? "Унікальні сумки ручної роботи."
          : "Unique handmade bags."
      }
    />
  );
};