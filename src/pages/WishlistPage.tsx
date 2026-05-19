import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useWishlist } from "../hooks/useWishlist";
import type { Product } from "../types";
import { productsService } from "../services/products.service";
import { ProductCard } from "../components/ProductCard";
import "./WishlistPage.scss";

export const WishlistPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlistProducts = async () => {
      setLoading(true);
      if (wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const allProducts = await productsService.getAllProducts();
      const wishlistProducts = allProducts.filter((p) =>
        wishlist.includes(p.id),
      );
      setProducts(wishlistProducts);
      setLoading(false);
    };

    loadWishlistProducts();
  }, [wishlist]);

  if (wishlist.length === 0) {
    return (
      <div className="container py-3">
        <div className="empty-wishlist">
          <h1>{t("wishlist.title")}</h1>
          <p>{t("wishlist.empty")}</p>
          <button
            className="btn btn--primary"
            onClick={() => navigate("/catalog")}
          >
            {t("cart.continueShopping")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="wishlist-page__title">{t("wishlist.title")}</h1>

        {loading ? (
          <div className="wishlist-page__loading">
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
          <div className="wishlist-page__empty">
            <p>{t("catalog.noProducts")}</p>
          </div>
        )}
      </div>
    </div>
  );
};
