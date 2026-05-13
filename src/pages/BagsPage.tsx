import { useLanguage } from "../hooks/useLanguage";
import { CategoryPageTemplate } from "../components/CategoryPageTemplate";

export const BagsPage = () => {
  const { t } = useLanguage();

  return (
    <CategoryPageTemplate
      category="bags"
      title={t("nav.bags")}
      description="Унікальні сумки та аксесуари ручної роботи."
    />
  );
};