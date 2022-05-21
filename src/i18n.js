import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({

        /*     interpolation: {
              escapeValue: false, // not needed for react as it escapes by default
            }, */
        fallbackLng: 'en',
        debug: true,

        //we init with resources   
        resources: {

            ru: {
                translations: {
                    MainHeader: "Архитектурные артефакты и места",
                    headerMessageNothing: "",
                    SelectPosition: "Показать артефакты в округе выбранной точки (+/- 10km). Загрузка данных может занять некоторое время.",
                    FirstInstruction: "Выберите (кликом по карте) точку, чтобы осмотреть архитектурные памятки в ее округе. Затем нажмите кнопку 'Показать артефакты'.",
                    EmptyPosition: "Ошибка. Вы не выбрали точку на карте (кликните по карте).",
                    Wait: "Подождите...",
                    Filters: "Фильтры: ",
                    ThereAreNoArtefacts: "Нет ни одного артефакта. Попробуйте другое месторасположение.",
                    SelectCategory: "Выберите одну категорию из списка",
                    SelectAllCategories: "000--All categories (without filter)",
                    //"000--Все категории (без фильтра)"
                    ArtefactsName: "Имя: ",
                    ArtefactsCoordinates: "Координаты: ",
                    ArtefactsEvent: "События: ",
                    ArtefactsAuthor: "Авторы: ",
                    ArtefactsWiki: "Wiki-страница артефакта: ",
                    PointIsntDefined: "Не определена стартовая точка. Повторите клик по карте.",
                    ArtefactsCategory: "Категории: ",
                    CategoriesWikiPage: "Wiki-страница категории: ",
                    FindPlace: "Найти место по координатам или по наименованию: ",
                    Longitude: "Долгота: ",
                    Latitude: "Широта: ",
                    FindPlaceByCoordinates: "Найти по координатам", 
                    FindPlaceByName: "Найти по названию",
                    searchName: "Название: " ,
                    BadAnswerFromServer: "Неверный ответ от сервера"  
                }
            },

            
            uk: {
                translations: {
                    MainHeader: "Архітектурні артефакти та місця",
                    headerMessageNothing: "",
                    SelectPosition: "Показати артефакти поблизу обраного пункту (+/- 10km). Загрузка даних може зайняти деякий час.",
                    FirstInstruction: "Оберіть (кліком по мапі) точку, щоб оглянути архітектурні пам'ятки в ії окрузі. Потім натисніть на кнопку 'Показати артефакти'.",
                    EmptyPosition: "Помилка. Ви не обрали точку на мапі (клікніть по мапі).",
                    Wait: "Зачекайте...",
                    Filters: "Фільтри: ",
                    ThereAreNoArtefacts: "Не має жодного артефакту. Спробуйте інше місце знаходження.",
                    SelectCategory: "Оберіть одну категорію зі списку",
                    SelectAllCategories: "000--All categories (without filter)",
                    //"000--Усі категорії (без фільтру)"
                    ArtefactsName: "Ім'я: ",
                    ArtefactsCoordinates: "Координати: ",
                    ArtefactsEvent: "Події: ",
                    ArtefactsAuthor: "Автори: ",
                    ArtefactsWiki: "Wiki-сторінка артефакту: ",
                    PointIsntDefined: "Не визначена стартова точка. Повторіть клік по мапі.",
                    ArtefactsCategory: "Категорії: ",
                    CategoriesWikiPage: "Wiki-сторінка категорії: ",
                    FindPlace: "Знайти місце по координатам або по назві: ",
                    Longitude: "Довгота: ",
                    Latitude: "Широта: ",
                    FindPlaceByCoordinates: "Знайти по координатам",
                    FindPlaceByName: "Знайти за назвою",
                    searchName: "Назва: " ,
                    BadAnswerFromServer: "Невірна відповідь від серверу"  
                }
            },

            de: {
                translations: {
                    MainHeader: "Architektonische Anlagen und Plätze",
                    headerMessageNothing: "",
                    SelectPosition: "Zeigen Artefakte neben ausgewählte Punkt (+/- 10km). Datei Herunterladen kann eine Weile dauern.",
                    FirstInstruction: "Wählen Sie (clicken auf der Karte) den Punkt um das Umland anzusehen. Dann drücken den Knopf 'Zeigen Artefakte'.",
                    EmptyPosition: "Fehler. Sie haben die Position nicht gewählt (clicken die Karte).",
                    Wait: "Ein wenig warten...",
                    Filters: "Filter: ",
                    ThereAreNoArtefacts: "Es gibt kein Artefact hier. Versuchen Sie anderen Platz auf der Karte.",
                    SelectCategory: "Wählen Sie eine Kategorie aus der Liste",
                    SelectAllCategories: "000--All categories (without filter)",
                    //"000--Alle Kategorien (ohne Filter)"
                    ArtefactsName: "Name: ",
                    ArtefactsCoordinates: "Koordinaten: ",
                    ArtefactsEvent: "Ereignisse: ",
                    ArtefactsAuthor: "Autoren: ",
                    ArtefactsWiki: "Wiki-Seite des Artefakt: ", 
                    PointIsntDefined: "Start Punkt ist nicht festgestellt. Wiederholen Sie Klick auf die Karte.", 
                    ArtefactsCategory: "Kategorien: ",
                    CategoriesWikiPage: "Wiki-Seite der Kategorie: ",
                    FindPlace: "Ort nach Koordinaten oder nach Namen finden: ",
                    Longitude: "Länge: ",
                    Latitude: "Breite: ",
                    FindPlaceByCoordinates: "Nach Koordinaten suchen",
                    FindPlaceByName: "Nach Namen suchen",
                    searchName: "Name: ",
                    BadAnswerFromServer: "Die falsche Antwort von Server"  
                }
            },

            en: {
                translations: {
                    MainHeader: "Architecture artefacts and places",
                    headerMessageNothing: "",
                    SelectPosition: "Show Artefacts near selected point (+/- 10km). Downloading data may take a time.",
                    FirstInstruction: "Select (click on the map) point to explore architecture suburbs. Then press button 'Show artefacts'.",
                    EmptyPosition: "Error. You didn't select point by click on the map.",
                    Wait: "Wait, please...",
                    Filters: "Filters: ",
                    ThereAreNoArtefacts: "There are no artefacts here. Try another place at the map.",
                    SelectCategory: "Select one category from list",
                    SelectAllCategories: "000--All categories (without filter)",
                    ArtefactsName: "Name: ",
                    ArtefactsCoordinates: "Coordinates: ",
                    ArtefactsEvent: "Events: ",
                    ArtefactsAuthor: "Authors: ",
                    ArtefactsWiki: "Artefact's wiki-page: ",
                    PointIsntDefined: "Start point isn't defined. Repeat click at the map.",
                    ArtefactsCategory: "Categories: ",
                    CategoriesWikiPage: "Category's wiki-page: ",
                    FindPlace: "Find place by coordinates or by name: ",               
                    Longitude: "Longitude: ",
                    Latitude: "Latitude: ",
                    FindPlaceByCoordinates: "Find by coordinates",
                    FindPlaceByName: "Find by name",
                    searchName: "Name: ",
                    BadAnswerFromServer: "Wrong answer from server"       
                }
            },

            fr: {
                translations: {
                    MainHeader: "Objets et lieux architecturaux",
                    headerMessageNothing: "",
                    SelectPosition: "Afficher les artefacts à proximité du point sélectionné (+/- 10km). Le téléchargement des données peut prendre un certain temps.",
                    FirstInstruction: "Sélectionnez (cliquez sur la carte) le point pour explorer les banlieues architecturales. Appuyez ensuite sur le bouton 'Afficher les artefacts'.",
                    EmptyPosition: "Erreur. Vous n'avez pas sélectionné le point par clic sur la carte.",
                    Wait: "Attendez s'il vous plaît...",
                    Filters: "Filtres: ",
                    ThereAreNoArtefacts: "Il n'y a pas d'artefacts ici. Essayez un autre endroit sur la carte.",
                    SelectCategory: "Sélectionnez une catégorie dans la liste",
                    SelectAllCategories: "000--All categories (without filter)",
                    ArtefactsName: "Nom: ",
                    ArtefactsCoordinates: "Coordonnés: ",
                    ArtefactsEvent: "Événements: ",
                    ArtefactsAuthor: "Auteurs: ",
                    ArtefactsWiki: "La page wiki d'Artefact: ",
                    PointIsntDefined: "Le point de départ n'est pas défini. Répétez le clic sur la carte.",
                    ArtefactsCategory: "Catégories: ",
                    CategoriesWikiPage: "La page wiki de la catégorie: ",
                    FindPlace: "Trouver un lieu par coordonnées ou par nom: ",
                    Longitude: "Longitude: ",
                    Latitude: "Latitude: ",
                    FindPlaceByCoordinates: "Rechercher par coordonnées",
                    FindPlaceByName: "Rechercher par nom",
                    searchName: "Nom: ",
                    BadAnswerFromServer: "Mauvaise réponse du serveur"                        
                }
            },

            it: {
                translations: {
                    MainHeader: "Manufatti e luoghi architettonici",
                    headerMessageNothing: "",
                    SelectPosition: "Mostra artefatti vicino al punto selezionato (+/- 10km). Il download dei dati potrebbe richiedere del tempo.",
                    FirstInstruction: "Seleziona (clicca sulla mappa) il punto per esplorare le periferie dell'architettura. Quindi premere il pulsante 'Mostra artefatti'.",
                    EmptyPosition: "Errore. Non hai selezionato punto per clic sulla mappa.",
                    Wait: "Aspetta per favore...",
                    Filters: "Filtri: ",
                    ThereAreNoArtefacts: "Non ci sono artefatti qui. Prova un altro posto sulla mappa.",
                    SelectCategory: "Seleziona una categoria dall'elenco",
                    SelectAllCategories: "000--All categories (without filter)",
                    ArtefactsName: "Nome: ",
                    ArtefactsCoordinates: "Coordinate: ",
                    ArtefactsEvent: "Eventi: ",
                    ArtefactsAuthor: "Autori: ",
                    ArtefactsWiki: "Pagina wiki di Artefact: ",
                    PointIsntDefined: "Il punto di inizio non è definito. Ripetere il clic sulla mappa.",
                    ArtefactsCategory: "Categorie: ",
                    CategoriesWikiPage: "Pagina wiki della categoria: ",
                    FindPlace: "Trova luogo per coordinate o per nome: ",
                    Longitude: "Longitudine: ",
                    Latitude: "Latitudine: ",
                    FindPlaceByCoordinates: "Trova per coordinate",
                    FindPlaceByName: "Trova per nome",
                    searchName: "Nome: ",
                    BadAnswerFromServer: "Risposta sbagliata dal server"                       
                }
            },

            es: {
                translations: {
                    MainHeader: "Artefactos y lugares arquitectónicos",
                    headerMessageNothing: "",
                    SelectPosition: "Mostrar artefactos cerca del punto seleccionado (+/- 10km). La descarga de datos puede llevar un tiempo.",
                    FirstInstruction: "Seleccione (haga clic en el mapa) el punto para explorar los suburbios de la arquitectura. Luego presione el botón 'Mostrar artefactos'.",
                    EmptyPosition: "Error. No seleccionaste un punto haciendo clic en el mapa.",
                    Wait: "Espere por favor...",
                    Filters: "Filtros: ",
                    ThereAreNoArtefacts: "Aquí no hay artefactos. Prueba en otro lugar del mapa.",
                    SelectCategory: "Seleccione una categoría de la lista",
                    SelectAllCategories: "000--All categories (without filter)",
                    ArtefactsName: "Nombre: ",
                    ArtefactsCoordinates: "Coordenadas: ",
                    ArtefactsEvent: "Eventos: ",
                    ArtefactsAuthor: "Autores: ",
                    ArtefactsWiki: "Página wiki de Artefact: ",
                    PointIsntDefined: "El punto de inicio no está definido. Repita el clic en el mapa.",
                    ArtefactsCategory: "Categorías: ",
                    CategoriesWikiPage: "Página wiki de la categoría: ",
                    FindPlace: "Encontrar lugar por coordenadas o por nombre: ",
                    Longitude: "Longitud: ",
                    Latitude: "Latitud: ",
                    FindPlaceByCoordinates: "Encontrar por coordenadas",
                    FindPlaceByName: "Buscar por nombre",
                    searchName: "Nombre: ",
                    BadAnswerFromServer: "Respuesta incorrecta del servidor",                     
                }
            }

        },

        ns: ["translations"],
        defaultNS: ["translations"],

        react: {
            useSuspense: false,
            wait: true
        }
    });


export default i18n;