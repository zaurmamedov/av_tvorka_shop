import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { Product } from "../types";
import { productsService } from "../services/products.service";
import { ProductCard } from "../components/ProductCard";
import "./CategoryPage.scss";

export const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useLanguage();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Extract category from URL path
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const category = pathSegments[0] || "";

  // Map URL params to database values
  const categoryMap: Record<string, { uk: string; en: string }> = {
    jewelry: { uk: "Прикраси", en: "Jewelry" },
    bags: { uk: "Сумки", en: "Bags" },
    accessories: { uk: "Аксесуари", en: "Accessories" },
  };

  const categoryLabel = categoryMap[category];

  useEffect(() => {
    const loadCategoryProducts = async () => {
      if (!category || !categoryMap[category]) {
        navigate("/catalog");
        return;
      }

      setLoading(true);
      const categoryValue =
        language === "uk" ? categoryMap[category].uk : categoryMap[category].en;

      const result = await productsService.getProductsByCategory(categoryValue);
      setProducts(result);
      setLoading(false);
    };

    loadCategoryProducts();
  }, [category, language, navigate]);

  const title = language === "uk" ? categoryLabel?.uk : categoryLabel?.en;

  return (
    <div className="category-page">
      <div className="container">
        <h1 className="category-page__title">{title}</h1>

        {loading ? (
          <div className="category-page__loading">
            <p>{t("common.loading")}</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid--4col">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(id) => navigate(`/product/${id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="category-page__empty">
            <p>{t("catalog.noProducts")}</p>
            <button
              className="btn btn--primary"
              onClick={() => navigate("/catalog")}
            >
              {t("cart.continueShopping")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
