import { useLanguage } from "../hooks/useLanguage";
import { CategoryPageTemplate } from "../components/CategoryPageTemplate";

export const AccessoriesPage = () => {
  const { t } = useLanguage();

  return (
    <CategoryPageTemplate
      category="accessories"
      title={t("nav.accessories")}
      description="Стильні аксесуари для завершення вашого образу."
    />
  );
};