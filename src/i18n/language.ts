import i18n from "./index";

export const changeLanguage = async (lang: "fa" | "en") => {

    await i18n.changeLanguage(lang);

    document.documentElement.lang = lang;

    document.documentElement.dir =
        lang === "fa"
            ? "rtl"
            : "ltr";
};

export const currentLanguage = () => {

    return i18n.language;
};
export const isRTL = () => {

    return currentLanguage() === "fa";
};
