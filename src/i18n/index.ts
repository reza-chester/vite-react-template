import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import faCommon from "./locales/login/fa.json";
import enCommon from "./locales/login/en.json";


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "fa",

        supportedLngs: ["fa", "en"],

        defaultNS: "login",

        ns: [
            "login"
        ],

        resources: {
            fa: {
                login: faCommon,
                
            },
            en: {
                login: enCommon,
              
            }
        },

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;