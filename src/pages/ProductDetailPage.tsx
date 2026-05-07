import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { Product } from "../types";
import { productsService } from "../services/products.service";
import { currencyUtils, priceUtils } from "../lib/utils";
import { ProductCard } from "../components/ProductCard";
import "./ProductDetailPage.scss";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { currency, exchangeRates } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      setLoading(true);
      const prod = await productsService.getProductById(id);
      setProduct(prod);

      if (prod) {
        // Get related products by category
        const allProducts = await productsService.getAllProducts();
        const related = allProducts
          .filter(
            (p) =>
              p.id !== prod.id &&
              (language === "uk" ? p.category_ukr : p.category_en) ===
                (language === "uk" ? prod.category_ukr : prod.category_en),
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }

      setLoading(false);
    };
    loadProduct();
  }, [id, language]);

  if (loading) {
    return <div className="container py-3">{t("common.loading")}</div>;
  }

  if (!product) {
    return (
      <div className="container">
        <p>{t("catalog.noProducts")}</p>
        <button
          className="btn btn--primary"
          onClick={() => navigate("/catalog")}
        >
          {t("nav.catalog")}
        </button>
      </div>
    );
  }

  const name = language === "uk" ? product.name_ukr : product.name_en;
  const description =
    language === "uk" ? product.description_ukr : product.description_en;
  const category =
    language === "uk" ? product.category_ukr : product.category_en;
  const material =
    language === "uk" ? product.material_ukr : product.material_en;

  const originalPrice = product.price;
  const discountedPrice = priceUtils.calculateDiscount(
    originalPrice,
    product.discount,
  );
  const convertedPrice = currencyUtils.convert(discountedPrice, currency);
  const convertedOriginalPrice = currencyUtils.convert(originalPrice, currency);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show success message or notification
    alert(language === "uk" ? "Додано в кошик" : "Added to cart");
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Back Button */}
        <button
          className="product-detail-page__back"
          onClick={() => navigate(-1)}
        >
          ← {language === "uk" ? "Назад" : "Back"}
        </button>

        {/* Main Product Section */}
        <div className="product-detail-page__layout">
          {/* Image */}
          <div className="product-detail-page__image">
            <img
              src={
                product.img ||
                "https://via.placeholder.com/500x500?text=Product"
              }
              alt={name}
            />
            {product.discount > 0 && (
              <span className="product-detail-page__discount">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Details */}
          <div className="product-detail-page__details">
            <h1 className="product-detail-page__title">{name}</h1>

            <div className="product-detail-page__metadata">
              <div>
                <span className="label">{t("product.category")}:</span>
                <span>{category}</span>
              </div>
              <div>
                <span className="label">{t("product.material")}:</span>
                <span>{material}</span>
              </div>
            </div>

            {/* Price */}
            <div className="product-detail-page__price">
              <div className="current-price">
                {currencyUtils.format(convertedPrice, currency)}
              </div>
              {product.discount > 0 && (
                <div className="original-price">
                  {currencyUtils.format(convertedOriginalPrice, currency)}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="product-detail-page__description">
              <h3>{t("productDetail.description")}</h3>
              <p>{description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="product-detail-page__actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">{t("productDetail.quantity")}:</label>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button
                className="btn btn--primary btn--lg"
                onClick={handleAddToCart}
              >
                {t("productDetail.addToCart")}
              </button>

              <button
                className={`product-detail-page__wishlist-btn ${inWishlist ? "active" : ""}`}
                onClick={() => {
                  if (inWishlist) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product.id);
                  }
                }}
              >
                {inWishlist ? "❤ " : "♡ "}
                {t(
                  inWishlist
                    ? "product.removeFromWishlist"
                    : "product.addToWishlist",
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="product-detail-page__related">
            <h2>{t("product.related")}</h2>
            <div className="grid grid--4col">
              {relatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onViewDetails={(id) => navigate(`/product/${id}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
