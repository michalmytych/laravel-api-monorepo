import { useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../i18n/locale";
import { registerUser, resetAuthState } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface RegisterField {
  id: string;
  name: "name" | "email" | "password" | "password_confirmation";
  type: "text" | "email" | "password";
  autoComplete: string;
  label: string;
  value: string;
  setter: Dispatch<SetStateAction<string>>;
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useLocale();
  const { status, error, user } = useAppSelector((state) => state.auth);
  const fieldErrors = error?.errors ?? {};

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(registerUser({
      name, email, password, password_confirmation: passwordConfirmation,
    }));
    if (registerUser.fulfilled.match(resultAction)) navigate("/");
  };

  const updateField = (setter: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(resetAuthState());
      setter(event.target.value);
    };

  const fields: RegisterField[] = [
    { id: "register-name", name: "name", type: "text", autoComplete: "name", label: t("field.name"), value: name, setter: setName },
    { id: "register-email", name: "email", type: "email", autoComplete: "email", label: t("field.email"), value: email, setter: setEmail },
    { id: "register-password", name: "password", type: "password", autoComplete: "new-password", label: t("field.password"), value: password, setter: setPassword },
    { id: "register-password-confirmation", name: "password_confirmation", type: "password", autoComplete: "new-password", label: t("field.passwordConfirmation"), value: passwordConfirmation, setter: setPasswordConfirmation },
  ];

  return (
    <section>
      <h1>{t("register.title")}</h1>
      {error?.message && !error.errors && <p>{error.message}</p>}
      {error && !error.message && !error.errors && <p>{t("error.unknown")}</p>}
      {user && <p>{t("register.alreadySignedIn", { email: user.email })}</p>}
      <form onSubmit={handleSubmit} noValidate>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.id}>{field.label}</label>
            <input id={field.id} type={field.type} autoComplete={field.autoComplete} value={field.value}
              onChange={updateField(field.setter)} aria-invalid={Boolean(fieldErrors[field.name])}
              aria-describedby={fieldErrors[field.name] ? `${field.id}-error` : undefined} />
            {fieldErrors[field.name]?.map((message) => (
              <span id={`${field.id}-error`} key={message}>{message}</span>
            ))}
          </div>
        ))}
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? t("register.loading") : t("register.submit")}
        </button>
      </form>
    </section>
  );
}
