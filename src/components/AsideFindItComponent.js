import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

//i18next
import { useTranslation } from 'react-i18next';

import FoundPlaces from './FoundPlacesComponent';
import RemoteDataService from '../service/RemoteDataService';

export default function AsideFindItComponent(props) {

    const [t, i18n] = useTranslation();

    const findPlaceByCoordinates = () => (
        ReactDOM.render(
            <FoundPlaces responseGeonames={null} />,
            document.getElementById('foundPlaces')),
        props.FindPlaceByCoordinate([Number(document.getElementById('longitude').value) + Number("0." + document.getElementById('longitudeDec').value), Number(document.getElementById('latitude').value) + Number("0." + document.getElementById('latitudeDec').value)])
    )

    const findPlaceByCityName = (e)=> (
        props.FindPlaceByCoordinate(e)
    )

    //with async:
    let cityName = null;
    const findPlaceByName = () => (
        cityName = document.getElementById('searchName').value.trim(),
        RemoteDataService.findPlaceByName(cityName, t.language).then(
            (response) => {
                ReactDOM.render(
                    <FoundPlaces responseGeonames={response} findPlaceByCityName = {findPlaceByCityName}/>,
                    document.getElementById('foundPlaces'))
            }
        )
    );

    return (
        <Fragment>
            <h2 style={{ marginLeft: 2 + 'em' }}>{t("FindPlaceByCoordinates")}</h2>
            <p style={{ marginLeft: 2 + 'em' }} >
                <label htmlFor="longitude">{t('Longitude')}</label>
                <input type="number" id="longitude" name="longitude" min="0.0" max="360" /> . <input type="number" id="longitudeDec" name="longitudeDec"
                    min="0.0" max="360" />
            </p>
            <p style={{ marginLeft: 2 + 'em' }} >
                <label htmlFor="latitude">{t('Latitude')}</label>
                <input type="number" id="latitude" name="latitude" min="0.0" max="360" /> . <input type="number" id="latitudeDec" name="latitudeDec"
                    min="0.0" max="360" />
            </p>
            <p></p>
            <button style={{ marginLeft: 2 + 'em' }} onClick={findPlaceByCoordinates}>{t('FindPlaceByCoordinates')}</button>
            <p></p>
            <h2 style={{ marginLeft: 2 + 'em' }}>{t("FindPlaceByName")}</h2>
            <p style={{ marginLeft: 2 + 'em' }} >
                <label htmlFor="searchName">{t('searchName')}</label>
                <input type="text" id="searchName" name="searchName" />
            </p>
            <p></p>
            <button style={{ marginLeft: 2 + 'em' }} onClick={findPlaceByName}>{t('FindPlaceByName')}</button>
            <p></p>
        </Fragment>
    )
}
