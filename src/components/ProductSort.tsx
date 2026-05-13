import { useLanguage } from "../hooks/useLanguage";
import { SortOption } from "../types";

interface ProductSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const ProductSort = ({
  value,
  onChange,
}: ProductSortProps) => {
  const { t } = useLanguage();

  return (
    <div className="catalog-page__sort">
      <label>{t("catalog.sort")}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
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
  );
};