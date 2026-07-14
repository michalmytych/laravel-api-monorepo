import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { useLocale } from "./i18n/locale.js";

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
          <select value={locale} onChange={(event) => setLocale(event.target.value)}>
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
