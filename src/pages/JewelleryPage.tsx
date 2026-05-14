import { useLanguage } from "../hooks/useLanguage";
import { CategoryPageTemplate } from "../components/CategoryPageTemplate";

export const JewelleryPage = () => {
  const { t, language } = useLanguage();

  return (
    <CategoryPageTemplate
      category="jewellery"
      title={t("nav.jewellery")}
      description={
        language === "uk"
          ? "Авторські прикраси ручної роботи для особливих образів."
          : "Handmade jewellery for special looks."
      }
    />
  );
};