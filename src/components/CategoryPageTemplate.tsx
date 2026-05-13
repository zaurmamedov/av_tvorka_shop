import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { type Product, SortOption } from "../types";
import { productsService } from "../services/products.service";
import { ProductCard } from "./ProductCard";
import { ProductSort } from "./ProductSort";
import { sortProducts } from "../utils/sortProducts";
import "../pages/CategoryPage.scss";

interface CategoryPageTemplateProps {
  category: string;
  title: string;
  description: string;
}

export const CategoryPageTemplate = ({
  category,
  title,
  description,
}: CategoryPageTemplateProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.NEWEST);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      const data = await productsService.getProductsByCategory(category);

      const sortedProducts = sortProducts(data, sortBy);

      setProducts(sortedProducts);
      setLoading(false);
    };

    loadProducts();
  }, [category, sortBy]);

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-page__header">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <ProductSort
          value={sortBy}
          onChange={setSortBy}
        />

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
          </div>
        )}
      </div>
    </div>
  );
};