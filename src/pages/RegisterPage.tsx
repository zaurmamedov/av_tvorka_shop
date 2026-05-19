import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import "./AuthPage.scss";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const redirectTo = location.state?.from?.pathname || "/";

  const text =
    language === "uk"
      ? {
          title: "Створіть акаунт AV.TVORKA",
          subtitle: "Зареєструйтесь, щоб оформлювати замовлення швидше та зберігати обрані вироби.",
          panelEyebrow: "Luxury Essentials",
          panelHeadline: "Відкрийте доступ до вашого персонального простору покупки.",
          panelDescription:
            "З акаунтом AV.TVORKA ви можете повертатися до кошика, зберігати улюблені вироби та завершувати замовлення без зайвих кроків.",
          panelFeatures: [
            "Швидке оформлення замовлень",
            "Збереження вподобаних прикрас і аксесуарів",
            "Зручний перехід назад до checkout після реєстрації",
          ],
          quote: "AV.TVORKA timeless forms",
          fullName: "Ім'я",
          phone: "Телефон",
          email: "Електронна пошта",
          password: "Пароль",
          fullNamePlaceholder: "Ваше ім'я",
          phonePlaceholder: "+380",
          emailPlaceholder: "you@example.com",
          passwordPlaceholder: "Створіть пароль",
          submit: "Зареєструватись",
          loading: "Створюємо акаунт...",
          success: "Акаунт створено. Якщо потрібно, підтвердьте email або зачекайте на перенаправлення.",
          errorRequired: "Заповніть усі поля реєстрації.",
          show: "Показати",
          hide: "Сховати",
          switchText: "Уже маєте акаунт?",
          switchLink: "Увійдіть",
          footnote: "Реєстрація працює через Supabase Auth без додаткових сервісів.",
        }
      : {
          title: "Create your AV.TVORKA account",
          subtitle: "Register to check out faster and keep your selected pieces close.",
          panelEyebrow: "Luxury Essentials",
          panelHeadline: "Unlock your personal shopping space.",
          panelDescription:
            "With an AV.TVORKA account, you can return to your cart, save favorite pieces, and complete checkout without extra steps.",
          panelFeatures: [
            "Faster order placement",
            "Saved jewelry and accessory favorites",
            "Smooth return to checkout after registration",
          ],
          quote: "AV.TVORKA timeless forms",
          fullName: "Name",
          phone: "Phone",
          email: "Email",
          password: "Password",
          fullNamePlaceholder: "Your name",
          phonePlaceholder: "+380",
          emailPlaceholder: "you@example.com",
          passwordPlaceholder: "Create a password",
          submit: "Register",
          loading: "Creating account...",
          success: "Account created. If required, confirm your email or wait for redirect.",
          errorRequired: "Please fill in all registration fields.",
          show: "Show",
          hide: "Hide",
          switchText: "Already have an account?",
          switchLink: "Log in",
          footnote: "Registration runs through Supabase Auth with no extra services.",
        };

  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, redirectTo, user]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !fullName || !phone) {
      setErrorMessage(text.errorRequired);
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await authService.signUp(email, password, fullName, phone);

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setSuccessMessage(text.success);
    setLoading(false);
  };

  return (
    <section className="auth-page">
      <div className="container auth-page__container auth-page__container--single">
        <div className="auth-page__card">
          <div className="auth-page__header">
            <h1 className="auth-page__title">{text.title}</h1>
            <p className="auth-page__subtitle">{text.subtitle}</p>
          </div>

          <form className="auth-page__form" onSubmit={handleRegister}>
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

            <div className="auth-page__row">
              <div className="form-group">
                <label htmlFor="register-name" className="form-label">
                  {text.fullName}
                </label>
                <input
                  id="register-name"
                  type="text"
                  placeholder={text.fullNamePlaceholder}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input"
                  autoComplete="name"
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-phone" className="form-label">
                  {text.phone}
                </label>
                <input
                  id="register-phone"
                  type="tel"
                  placeholder={text.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input"
                  autoComplete="tel"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="register-email" className="form-label">
                {text.email}
              </label>
              <input
                id="register-email"
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
              <label htmlFor="register-password" className="form-label">
                {text.password}
              </label>
              <div className="auth-page__field">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={text.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  autoComplete="new-password"
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
                  to="/login"
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
