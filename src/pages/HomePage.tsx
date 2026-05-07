import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { Product } from "../types";
import { productsService } from "../services/products.service";
import { ProductCard } from "../components/ProductCard";
import "./HomePage.scss";

export const HomePage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const products = await productsService.getAllProducts();
      // Get first 4 products as featured
      setFeaturedProducts(products.slice(0, 4));
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">{t("home.hero.title")}</h1>
          <p className="hero__subtitle">{t("home.hero.subtitle")}</p>
          <button
            className="btn btn--primary btn--lg"
            onClick={() => navigate("/catalog")}
          >
            {t("home.hero.cta")}
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured">
        <div className="container">
          <div className="featured__header">
            <h2>{t("home.featured.title")}</h2>
            <a href="/catalog" className="featured__view-all">
              {t("home.featured.viewAll")} →
            </a>
          </div>

          {loading ? (
            <div className="featured__loading">
              <p>{t("common.loading")}</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid--4col">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(id) => navigate(`/product/${id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="featured__empty">
              <p>{t("catalog.noProducts")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="grid grid--3col">
            <div className="benefit-card">
              <div className="benefit-card__icon">📦</div>
              <h3>{language === "uk" ? "Швидка доставка" : "Fast Delivery"}</h3>
              <p>
                {language === "uk"
                  ? "Доставляємо по всій Україні"
                  : "Delivery across Ukraine"}
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">🎁</div>
              <h3>
                {language === "uk" ? "Якісні матеріали" : "Quality Materials"}
              </h3>
              <p>
                {language === "uk"
                  ? "Тільки найкращі матеріали"
                  : "Only the finest materials"}
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">❤️</div>
              <h3>{language === "uk" ? "Ручна робота" : "Handmade"}</h3>
              <p>
                {language === "uk"
                  ? "Кожна прикраса унікальна"
                  : "Every piece is unique"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
