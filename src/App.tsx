import "./styles/App.css";
import Login from "./layouts/Login";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "./i18n/language";
import Card from "./components/Card";
import { useEffect } from "react";

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <section className="flex items-center justify-center h-full">
        <Card
          className="lang-switch"
          role="group"
          children={
            <>
              <span className="ls-label">
                <Languages />
              </span>
              <button
                type="button"
                aria-pressed={i18n.language == "en"}
                onClick={() => {
                  changeLanguage("en");
                }}
              >
                English
              </button>
              <button
                type="button"
                aria-pressed={i18n.language == "fa"}
                className="me-1"
                onClick={() => {
                  changeLanguage("fa");
                }}
              >
                فارسی
              </button>
            </>
          }
        />

        <Login />
      </section>
    </>
  );
}

export default App;
