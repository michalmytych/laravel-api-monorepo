import { Link, Route, Routes } from "react-router-dom";
import { useLocale, type Locale } from "./i18n/locale";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div>
      <header>
        <nav aria-label="Main navigation">
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/login"> / {t("nav.login")}</Link>
          <Link to="/register"> / {t("nav.register")}</Link>
        </nav>
        <label>
          <span>{t("locale.label")}</span>
          <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
            <option value="en">EN</option>
            <option value="pl">PL</option>
          </select>
        </label>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}
