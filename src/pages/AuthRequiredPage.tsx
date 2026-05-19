import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

export const AuthRequiredPage = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { language } = useLanguage();
  const from = location.state?.from || { pathname: "/checkout" };

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to={from.pathname || "/checkout"} replace />;
  }

  return (
    <div className="container py-3">
      <div className="empty-cart">
        <h1>{language === "uk" ? "Потрібна авторизація" : "Authorization Required"}</h1>
        <p>
          {language === "uk"
            ? "Щоб продовжити покупку, зареєструйтесь або увійдіть у свій акаунт."
            : "To continue your purchase, please register or log in to your account."}
        </p>

        <div className="button-group">
          <Link
            to="/register"
            state={{ from }}
            className="btn btn--primary"
          >
            {language === "uk" ? "Зареєструйтесь" : "Register"}
          </Link>

          <Link
            to="/login"
            state={{ from }}
            className="btn btn--outline"
          >
            {language === "uk" ? "Увійдіть" : "Log in"}
          </Link>
        </div>
      </div>
    </div>
  );
};
