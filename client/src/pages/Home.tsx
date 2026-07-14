import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/locale";
import { fetchUser, logoutUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const { t } = useLocale();
  const { user, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    void dispatch(fetchUser());
  }, [dispatch]);

  if (status === "loading" && !user) {
    return <p>{t("home.loading")}</p>;
  }

  return (
    <section>
      <h1>{t("home.title")}</h1>
      {user ? (
        <>
          <p>{t("home.signedInAs")}: {user.name} ({user.email})</p>
          <button type="button" onClick={() => void dispatch(logoutUser())}>{t("home.logout")}</button>
        </>
      ) : (
        <>
          <p>{t("home.signedOut")}</p>
          <div>
            <Link to="/login">{t("home.goToLogin")}</Link>
            <Link to="/register">{t("home.goToRegister")}</Link>
          </div>
        </>
      )}
    </section>
  );
}
