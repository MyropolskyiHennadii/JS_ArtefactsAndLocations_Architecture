import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

//i18next
import i18n from "i18next";

//ol
import { View } from "ol";
import { fromLonLat } from "ol/proj";

import MainMap from "./MainMapComponent";
import RemoteDataService from "../service/RemoteDataService";
import GeomarkersService from "../service/GeomarkersService";
import AsideFilterComponent from "./AsideFilterComponent";

export default function MainWraper(props) {
  const [geoMarkers, setGeoMarkers] = useState(null);
  const [artefacts, setArtefacts] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [viewMap, setViewMap] = useState(
    new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
    })
  );

  //refresh or fill geomarkers
  const refreshGeomarkers = (artefacts) =>
    setGeoMarkers(GeomarkersService.getMarkersArray(artefacts, i18n.language));

  //call back from main map
  const handleSelectionPointOnTheMap = (e) => (
    //clear filter
    ReactDOM.render(
      <AsideFilterComponent
        message={"Wait"}
        allCategories={null}
        artefacts={null}
        refreshGeomarkers={null}
      />,
      document.getElementById("filters")
    ),
    RemoteDataService.getLocationsCategoriesArtefacts(e).then((response) => {
      console.log("Response status from server: " + response.status);
      //bad answer
      if (response.status != 200) {
        console.log("Bad answer from the server.")
        ReactDOM.render(
          <AsideFilterComponent
            message={"BadAnswerFromServer"}
            allCategories={null}
            artefacts={null}
            refreshGeomarkers={null}
          />,
          document.getElementById("filters")
        );
      } else {
        setArtefacts(response.data.artefacts);
        setAllCategories(response.data.categories);
        refreshGeomarkers(response.data.artefacts);

        //AsideFilter with categories from response.data.categories
        if (response.data.categories.length > 0) {
          ReactDOM.render(
            <AsideFilterComponent
              message={""}
              allCategories={response.data.categories}
              artefacts={response.data.artefacts}
              refreshGeomarkers={refreshGeomarkers}
            />,
            document.getElementById("filters")
          );
        } else {
          console.log("Impossible to show AsideFilterComponent.")
          ReactDOM.render(
            <AsideFilterComponent
              message={"ThereAreNoArtefacts"}
              allCategories={null}
              artefacts={null}
              refreshGeomarkers={null}
            />,
            document.getElementById("filters")
          );
        }
      }
    })
  );

  return (
    <Fragment>
      <MainMap
        viewMap={viewMap}
        t={props.t}
        handleSelectionPointOnTheMap={handleSelectionPointOnTheMap}
        geoMarkers={geoMarkers}
        artefacts={artefacts}
        allCategories={allCategories}
      />
    </Fragment>
  );
}
