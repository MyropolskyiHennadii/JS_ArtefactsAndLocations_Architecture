import i18n from "i18next";

//path to cross origin (Java API)
const pathToCrossOrigin = 'http://localhost:8080/apiArtefacts/';
//languages:
const languages = ['en', 'de', 'es', 'fr', 'it', 'ru', 'uk'];
const languagesNames = ['English', 'Deutsch', 'Español', 'Français', 'Italiano', 'Русский', 'Українська'];


class CommonConstants {

    getPathToCrossOrigin(params) {
        return pathToCrossOrigin;
    }

    buildLanguageOptions() {
        let options = [];

        const indLanguage = languages.indexOf(i18n.language);
        if (indLanguage >= 0) {
            options.push(<option value={languages[indLanguage]} id={languages[indLanguage]} key={languages[indLanguage]}>{languagesNames[indLanguage]}</option>);
        }

        for (let ind = 0; ind < languages.length; ind++) {
            if (ind !== indLanguage) {
                options.push(<option value={languages[ind]} id={languages[ind]} key={languages[ind]}>{languagesNames[ind]}</option>);
            }
        }
        return options;
    }

    getLanguages(){
        return languages;
    }

    getLanguagesNames(){
        return languagesNames;
    }
}

export default new CommonConstants();