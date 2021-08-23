import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//i18next
import i18n from "i18next";

//ol
import { View } from 'ol';
import * as olProj from 'ol/proj';
import { fromLonLat } from "ol/proj";

import MainMap from './MainMapComponent';
import RemoteDataService from '../service/RemoteDataService';
import GeomarkersService from '../service/GeomarkersService';
import AsideFilterComponent from './AsideFilterComponent';

export default function MainWraper(props) {

    const [geoMarkers, setGeoMarkers] = useState(null);
    const [artefacts, setArtefacts] = useState(null);
    const [allCategories, setAllCategories] = useState(null);
    const [linksToPhotos, setLinksToPhotos] = useState(null);
    const [viewMap, setViewMap] = useState(new View({
        center: fromLonLat([0, 0]),
        zoom: 2
    }));

    //refresh or fill geomarkers
    const refreshGeomarkers = (artefacts) => (
        setGeoMarkers(GeomarkersService.getMarkersArray(artefacts, i18n.language))
    );


    //call back from main map
    const handleSelectionPointOnTheMap = (e) => (

        //clear filter
        ReactDOM.render(
            <React.StrictMode>
                <AsideFilterComponent message={"Wait"}
                    categories={null}
                    allCategories={null} 
                    artefacts = {null}
                    refreshGeomarkers = {null}                   
                    />
            </React.StrictMode>,
            document.getElementById('filters')
        ),

        RemoteDataService.getLocationsCategoriesArtefacts(olProj.transform(e, 'EPSG:3857', 'EPSG:4326'))
            .then(
                (response) => {
                    setArtefacts(response.data.artefacts);
                    setAllCategories(response.data.all_categories);
                    setLinksToPhotos(response.data.artefacts_photo);
                    refreshGeomarkers(response.data.artefacts);    
                    console.log("Size of artefacts categories:"+response.data.artefacts_categories.length);    
      
                    //AsideFilter with categories from response.data.artefacts_categories
                    if (response.data.artefacts_categories.length > 0) {
                        ReactDOM.render(
                            <React.StrictMode>
                                <AsideFilterComponent message={""}
                                    categories = {response.data.artefacts_categories}
                                    allCategories={response.data.all_categories}
                                    artefacts = {response.data.artefacts}
                                    refreshGeomarkers = {refreshGeomarkers}
                                />
                            </React.StrictMode>,
                            document.getElementById('filters')
                        )
                    } else {
                        ReactDOM.render(
                            <React.StrictMode>
                                <AsideFilterComponent message={"ThereAreNoArtefacts"}
                                    categories = {null}
                                    allCategories={null}
                                    artefacts = {null}
                                    refreshGeomarkers = {null}
                                />
                            </React.StrictMode>,
                            document.getElementById('filters')
                        )
                    }
                }
            )
    );

    return (
        <div>
            <MainMap
                viewMap={viewMap}
                t={props.t}
                handleSelectionPointOnTheMap={handleSelectionPointOnTheMap}
                geoMarkers={geoMarkers}
                artefacts = {artefacts}
                allCategories = {allCategories}
                linksToPhotos = {linksToPhotos}
            />
        </div>
    )

}
