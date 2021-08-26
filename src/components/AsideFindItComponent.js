import React, { Fragment, useState } from 'react';
//i18next
import { useTranslation } from 'react-i18next';

export default function AsideFindItComponent(props) {

    const [t, i18n] = useTranslation();


    const getCoordinates = () => (
        props.FindPlaceByCoordinate([Number(document.getElementById('longitude').value) + Number("0." + document.getElementById('longitudeDec').value), Number(document.getElementById('latitude').value) + Number("0." + document.getElementById('latitudeDec').value)])
    )

    return (
        <Fragment>
            <h2 style={{ marginLeft: 2 + 'em' }}>{t("FindPlace")}</h2>
            <p style={{ marginLeft: 2 + 'em' }} >
                <label htmlFor="longitude">{t('Longitude')}</label>
                <input type="number" id="longitude" name="longitude" min="0" max="360"
                /> . <input type="number" id="longitudeDec" name="longitudeDec" min="0" max="99999"
                />
            </p>
            <p style={{ marginLeft: 2 + 'em' }} >
                <label htmlFor="latitude">{t('Latitude')}</label>
                <input type="number" id="latitude" name="latitude"
                    min="0" max="360" /> . <input type="number" id="latitudeDec" name="latitudeDec" min="0" max="99999"
                />
            </p>
            <p id="mistakeCoordinate"></p>
            <p></p>
            <button style={{ marginLeft: 2 + 'em' }} onClick={getCoordinates}>{t('FindByCoordinates')}</button>
        </Fragment>
    )
}
