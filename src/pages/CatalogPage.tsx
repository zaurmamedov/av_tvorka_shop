import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { type Product, SortOption } from "../types";
import { productsService } from "../services/products.service";
import { ProductCard } from "../components/ProductCard";
import "./CatalogPage.scss";

export const CatalogPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.NEWEST);

  // Extract unique categories
  const categories = [
    ...new Set(
      products.map((p) => (language === "uk" ? p.category_ukr : p.category_en)),
    ),
  ];

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const allProducts = await productsService.getAllProducts();
      setProducts(allProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => {
        const cat = language === "uk" ? p.category_ukr : p.category_en;
        return cat === selectedCategory;
      });
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Discount filter
    if (onlyDiscounted) {
      result = result.filter((p) => p.discount > 0);
    }

    // Sorting
    switch (sortBy) {
      case SortOption.PRICE_ASC:
        result.sort((a, b) => a.price - b.price);
        break;
      case SortOption.PRICE_DESC:
        result.sort((a, b) => b.price - a.price);
        break;
      case SortOption.POPULARITY:
        // Placeholder for popularity
        break;
      case SortOption.NEWEST:
      default:
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
    }

    setFilteredProducts(result);
  }, [
    products,
    selectedCategory,
    priceRange,
    onlyDiscounted,
    sortBy,
    language,
  ]);

  return (
    <div className="catalog-page">
      <div className="container">
        <h1 className="catalog-page__title">{t("catalog.title")}</h1>

        <div className="catalog-page__layout">
          {/* Filters Sidebar */}
          <aside className="catalog-page__filters">
            <h3>{t("catalog.filters")}</h3>

            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">{t("catalog.category")}</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="">{language === "uk" ? "Всі" : "All"}</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <label className="filter-label">{t("catalog.price")}</label>
              <div className="price-inputs">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="input"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="input"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Discount Filter */}
            <div className="filter-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={onlyDiscounted}
                  onChange={(e) => setOnlyDiscounted(e.target.checked)}
                />
                <span>{t("catalog.discount")}</span>
              </label>
            </div>

            {/* Clear Filters */}
            <button
              className="btn btn--outline btn--block"
              onClick={() => {
                setSelectedCategory("");
                setPriceRange([0, 10000]);
                setOnlyDiscounted(false);
              }}
            >
              {language === "uk" ? "Очистити фільтри" : "Clear Filters"}
            </button>
          </aside>

          {/* Products Grid */}
          <div className="catalog-page__content">
            {/* Sorting */}
            <div className="catalog-page__sort">
              <label>{t("catalog.sort")}</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="input"
              >
                <option value={SortOption.NEWEST}>
                  {t("catalog.sort.newest")}
                </option>
                <option value={SortOption.PRICE_ASC}>
                  {t("catalog.sort.price-asc")}
                </option>
                <option value={SortOption.PRICE_DESC}>
                  {t("catalog.sort.price-desc")}
                </option>
                <option value={SortOption.POPULARITY}>
                  {t("catalog.sort.popularity")}
                </option>
              </select>
            </div>

            {/* Results Count */}
            <div className="catalog-page__results-info">
              <p>
                {t("catalog.results")}:{" "}
                <strong>{filteredProducts.length}</strong>
              </p>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="catalog-page__loading">
                <p>{t("common.loading")}</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid--4col">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={(id) => navigate(`/product/${id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="catalog-page__empty">
                <p>{t("catalog.noProducts")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
