import { useLanguage } from "../hooks/useLanguage";
import { CategoryPageTemplate } from "../components/CategoryPageTemplate";

export const JewelleryPage = () => {
  const { t } = useLanguage();

  return (
    <CategoryPageTemplate
      category="jewellery"
      title={t("nav.jewellery")}
      description="Авторські прикраси ручної роботи для особливих образів."
    />
  );
};