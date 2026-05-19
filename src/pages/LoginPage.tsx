import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import "./AuthPage.scss";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const redirectTo = location.state?.from?.pathname || "/";

  const text =
    language === "uk"
      ? {
          title: "Увійдіть до AV.TVORKA",
          subtitle: "Поверніться до обраних виробів, кошика та оформлення замовлення.",
          panelEyebrow: "Jewelry & Accessories",
          panelHeadline: "Продовжуйте покупку у вашому ритмі.",
          panelDescription:
            "Увійдіть, щоб зберігати обране, оформлювати замовлення та повертатися до кошика без зайвих кроків.",
          panelFeatures: [
            "Швидке повернення до оформлення замовлення",
            "Збережений кошик і персональні дані",
            "Мінімалістичний преміальний досвід покупки",
          ],
          quote: "AV.TVORKA handcrafted details",
          email: "Електронна пошта",
          password: "Пароль",
          emailPlaceholder: "you@example.com",
          passwordPlaceholder: "Введіть пароль",
          submit: "Увійти",
          loading: "Входимо...",
          success: "Успішний вхід. Перенаправляємо...",
          errorRequired: "Введіть електронну пошту та пароль.",
          show: "Показати",
          hide: "Сховати",
          switchText: "Ще не маєте акаунта?",
          switchLink: "Зареєструйтесь",
          footnote: "Ваші дані захищені через Supabase Auth.",
        }
      : {
          title: "Log in to AV.TVORKA",
          subtitle: "Return to your saved pieces, cart, and checkout in one step.",
          panelEyebrow: "Jewelry & Accessories",
          panelHeadline: "Continue your purchase at your own pace.",
          panelDescription:
            "Sign in to keep your favorites, complete orders, and return to checkout without starting over.",
          panelFeatures: [
            "Fast return to checkout",
            "Saved cart and personal details",
            "A premium minimalist shopping experience",
          ],
          quote: "AV.TVORKA handcrafted details",
          email: "Email",
          password: "Password",
          emailPlaceholder: "you@example.com",
          passwordPlaceholder: "Enter your password",
          submit: "Log in",
          loading: "Logging in...",
          success: "Login successful. Redirecting...",
          errorRequired: "Please enter your email and password.",
          show: "Show",
          hide: "Hide",
          switchText: "Don't have an account yet?",
          switchLink: "Register",
          footnote: "Your data is protected through Supabase Auth.",
        };

  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, redirectTo, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage(text.errorRequired);
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await authService.signIn(email, password);

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setSuccessMessage(text.success);
  };

  return (
    <section className="auth-page">
      <div className="container auth-page__container auth-page__container--single">
        <div className="auth-page__card">
          <div className="auth-page__header">
            <h1 className="auth-page__title">{text.title}</h1>
            <p className="auth-page__subtitle">{text.subtitle}</p>
          </div>

          <form className="auth-page__form" onSubmit={handleLogin}>
            {errorMessage && (
              <div className="auth-page__message auth-page__message--error">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="auth-page__message auth-page__message--success">
                {successMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="login-email" className="form-label">
                {text.email}
              </label>
              <input
                id="login-email"
                type="email"
                placeholder={text.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                autoComplete="email"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password" className="form-label">
                {text.password}
              </label>
              <div className="auth-page__field">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={text.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  autoComplete="current-password"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="auth-page__password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? text.hide : text.show}
                >
                  {showPassword ? text.hide : text.show}
                </button>
              </div>
            </div>

            <div className="auth-page__actions">
              <button
                type="submit"
                className={`btn btn--primary btn--block btn--lg${loading ? " btn--loading" : ""}`}
                disabled={loading}
              >
                {loading ? text.loading : text.submit}
              </button>

              <div className="auth-page__switch">
                {text.switchText}{" "}
                <Link
                  to="/register"
                  state={location.state}
                  className="auth-page__switch-link"
                >
                  {text.switchLink}
                </Link>
              </div>
            </div>
          </form>

          <div className="auth-page__footnote">{text.footnote}</div>
        </div>
      </div>
    </section>
  );
};
