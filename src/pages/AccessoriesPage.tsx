import { useLanguage } from "../hooks/useLanguage";
import { CategoryPageTemplate } from "../components/CategoryPageTemplate";

export const AccessoriesPage = () => {
  const { t, language } = useLanguage();

  return (
    <CategoryPageTemplate
      category="accessories"
      title={t("nav.accessories")}
      description={
        language === "uk"
          ? "Стильні аксесуари для завершення вашого образу."
          : "Stylish accessories to complete your look."
      }
    />
  );
};