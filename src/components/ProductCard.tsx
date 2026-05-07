import { Product } from "../types";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { currencyUtils, priceUtils } from "../lib/utils";
import "./ProductCard.scss";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (id: string) => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { language, t } = useLanguage();
  const { currency, exchangeRates } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const name = language === "uk" ? product.name_ukr : product.name_en;
  const originalPrice = product.price;
  const discountedPrice = priceUtils.calculateDiscount(
    originalPrice,
    product.discount,
  );
  const convertedPrice = currencyUtils.convert(discountedPrice, currency);
  const convertedOriginalPrice = currencyUtils.convert(originalPrice, currency);

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={
            product.img || "https://via.placeholder.com/300x300?text=Product"
          }
          alt={name}
          className="product-card__image"
        />
        {product.discount > 0 && (
          <span className="product-card__discount-badge">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="product-card__content">
        <h3 className="product-card__name">{name}</h3>

        <div className="product-card__price">
          <span className="product-card__current-price">
            {currencyUtils.format(convertedPrice, currency)}
          </span>
          {product.discount > 0 && (
            <span className="product-card__original-price">
              {currencyUtils.format(convertedOriginalPrice, currency)}
            </span>
          )}
        </div>

        <div className="product-card__actions">
          <button
            className="btn btn--primary btn--sm"
            onClick={() => addToCart(product, 1)}
          >
            {t("product.addToCart")}
          </button>
          <button
            className={`product-card__wishlist ${inWishlist ? "active" : ""}`}
            onClick={() => {
              if (inWishlist) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product.id);
              }
            }}
            title={t(
              inWishlist
                ? "product.removeFromWishlist"
                : "product.addToWishlist",
            )}
          >
            {inWishlist ? "❤" : "♡"}
          </button>
          {onViewDetails && (
            <button
              className="btn btn--outline btn--sm"
              onClick={() => onViewDetails(product.id)}
            >
              {t("common.viewDetails")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
