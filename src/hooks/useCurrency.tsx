import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { Currency, CurrencyContextType } from "../types";
import { currencyUtils } from "../lib/utils";

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem("currency");
    return (saved as Currency) || "UAH";
  });

  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>(
    () => currencyUtils.getExchangeRates(),
  );

  useEffect(() => {
    const updateRates = async () => {
      const rates = await currencyUtils.fetchExchangeRates();
      setExchangeRates(rates as Record<Currency, number>);
    };
    updateRates();
  }, []);

  const setCurrency = useCallback((curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem("currency", curr);
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
};
