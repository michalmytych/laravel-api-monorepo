import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../i18n/locale.js";
import { loginUser, resetAuthState } from "../store/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLocale();
  const { status, error, user } = useSelector((state) => state.auth);
  const fieldErrors = error?.errors ?? {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  const updateField = (setter) => (event) => {
    dispatch(resetAuthState());
    setter(event.target.value);
  };

  return (
    <section>
      <h1>{t("login.title")}</h1>

      {error?.message && !error?.errors && <p>{error.message}</p>}
      {error && !error.message && !error.errors && <p>{t("error.unknown")}</p>}
      {user && <p>{t("login.alreadySignedIn", { email: user.email })}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="login-email">{t("field.email")}</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={updateField(setEmail)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
          />
          {fieldErrors.email?.map((message) => (
            <span id="login-email-error" key={message}>{message}</span>
          ))}
        </div>

        <div>
          <label htmlFor="login-password">{t("field.password")}</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={updateField(setPassword)}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "login-password-error" : undefined}
          />
          {fieldErrors.password?.map((message) => (
            <span id="login-password-error" key={message}>{message}</span>
          ))}
        </div>

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? t("login.loading") : t("login.submit")}
        </button>
      </form>
    </section>
  );
}
