import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import HeaderDescription from './HeaderDescriptionComponent';
import MapWrapper from './MapWrapperComponent';
import SelectLanguageComponent from './SelectLanguageComponent';


function renderHeaderLanguageFilter() {
    ReactDOM.render(
            <SelectLanguageComponent />,
        document.getElementById('select_language'));
    ReactDOM.render(
            <HeaderDescription />,
        document.getElementById('header_description'));
}


export default function MainPaneComponent(props) {
    React.useEffect(() => { renderHeaderLanguageFilter() });
    const [t, i18n] = useTranslation();
    return (
        <Fragment>
            <MapWrapper
            t = {t}
            />       
        </Fragment>
    )
}

