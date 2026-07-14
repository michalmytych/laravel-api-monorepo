import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocale } from "../i18n/locale.js";
import { fetchUser, logoutUser } from "../store/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { t } = useLocale();
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
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
          <button type="button" onClick={() => dispatch(logoutUser())}>{t("home.logout")}</button>
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
