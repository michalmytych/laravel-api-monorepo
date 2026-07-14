import { useEffect, useMemo, useState } from "react";
import { LocaleContext } from "./locale.js";

const messages = {
  en: {
    "nav.home": "Home",
    "nav.login": "Login",
    "nav.register": "Register",
    "locale.label": "Language",
    "home.title": "Home",
    "home.loading": "Loading…",
    "home.signedInAs": "Signed in as",
    "home.signedOut": "You are not signed in.",
    "home.goToLogin": "Go to login",
    "home.goToRegister": "Create an account",
    "home.logout": "Log out",
    "login.title": "Login",
    "login.loading": "Signing in…",
    "login.submit": "Sign in",
    "login.alreadySignedIn": "You are already signed in as {{email}}.",
    "register.title": "Create account",
    "register.loading": "Creating account…",
    "register.submit": "Register",
    "register.alreadySignedIn": "You are signed in as {{email}}.",
    "field.name": "Name",
    "field.email": "Email",
    "field.password": "Password",
    "field.passwordConfirmation": "Confirm password",
    "error.unknown": "Something went wrong. Try again later.",
  },
  pl: {
    "nav.home": "Strona główna",
    "nav.login": "Logowanie",
    "nav.register": "Rejestracja",
    "locale.label": "Język",
    "home.title": "Strona główna",
    "home.loading": "Ładowanie…",
    "home.signedInAs": "Zalogowano jako",
    "home.signedOut": "Nie jesteś zalogowany.",
    "home.goToLogin": "Przejdź do logowania",
    "home.goToRegister": "Utwórz konto",
    "home.logout": "Wyloguj",
    "login.title": "Logowanie",
    "login.loading": "Logowanie…",
    "login.submit": "Zaloguj",
    "login.alreadySignedIn": "Jesteś już zalogowany jako {{email}}.",
    "register.title": "Utwórz konto",
    "register.loading": "Tworzenie konta…",
    "register.submit": "Zarejestruj",
    "register.alreadySignedIn": "Jesteś zalogowany jako {{email}}.",
    "field.name": "Imię lub nazwa",
    "field.email": "Adres e-mail",
    "field.password": "Hasło",
    "field.passwordConfirmation": "Powtórz hasło",
    "error.unknown": "Coś poszło nie tak. Spróbuj ponownie później.",
  },
};

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem("locale") || "en");

  useEffect(() => {
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t(key, replacements = {}) {
      const template = messages[locale]?.[key] ?? messages.en[key] ?? key;

      return Object.entries(replacements).reduce(
        (text, [name, replacement]) => text.replace(`{{${name}}}`, replacement),
        template,
      );
    },
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
