import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import HeaderDescription from './HeaderDescriptionComponent';
import MapWrapper from './MapWrapperComponent';
import SelectLanguageComponent from './SelectLanguageComponent';


function renderHeaderLanguageFilter() {
    ReactDOM.render(
        <React.StrictMode>
            <SelectLanguageComponent />
        </React.StrictMode>,
        document.getElementById('select_language'));
    ReactDOM.render(
        <React.StrictMode>
            <HeaderDescription />
        </React.StrictMode>,
        document.getElementById('header_description'));
}


export default function MainPaneComponent(props) {
    React.useEffect(() => { renderHeaderLanguageFilter() });

    const [t, i18n] = useTranslation();
    return (
        <div>
            <MapWrapper
            t = {t}
            />       
        </div>
    )
}

