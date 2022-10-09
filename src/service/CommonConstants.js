import i18n from "i18next";

//path to cross origin (Java API)
const pathToCrossOriginPoint = 'http://localhost:8080/ArtefactsLocation_api_war/supplyArtefacts';
//const pathToCrossOrigin = 'http://94.130.181.51:8097/apiArtefacts/';

const pathToCrossOriginCreateRegion = 'http://localhost:8080/ArtefactsLocation_api_war/createArtefactsForRegionServlet';

//languages:
const languages = ['en', 'de', 'es', 'fr', 'it', 'ru', 'uk'];
const languagesNames = ['English', 'Deutsch', 'Español', 'Français', 'Italiano', 'Русский', 'Українська'];
//const arcGisAPI = 'AAPKfbb05f232d794a4fb1d6a678556b4134ZJ3Fo2WeKSnztu8w-F0dM8XLrANcfnaUorqunrQMufMSwdZ4lI-48FjeR0u7qcjF';
//https://www.geonames.org/export/geonames-search.html
const userGeode = "myropolskyi";
const AccessTokenMapboxGL = "pk.eyJ1IjoibXlyb3BvbHNreWkiLCJhIjoiY2t1dHVibDZvMmZlNDJwcDFwMTI3ZjU0dyJ9.J_kmeuSJGKwoKiqQXVfFAQ";


class CommonConstants {

    getPathToCrossOriginPoint(params) {
        return pathToCrossOriginPoint;
    }

    getPathToCrossOriginCreateRegion(params) {
        return pathToCrossOriginCreateRegion;
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

/*     getArcGisApiKey(){
        return arcGisAPI;
    } */

    getUserGeode(){
        return userGeode;
    }

    getMapAccessToken(){
        return AccessTokenMapboxGL;
    }
}

export default new CommonConstants();