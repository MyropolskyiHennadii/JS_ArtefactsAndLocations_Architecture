import React from "react";

export default function AsidePhotoComponent(props) {

    const feature = props.feature;
    const imStyle = { width: 225, height: 220 };
    let linkToPhoto = null;

    if ((feature !== null) && (feature !== undefined)) {
        linkToPhoto = feature.get('pathToImage');
    }
    // check if link exists:
    if ((linkToPhoto !== null) && (linkToPhoto !== undefined) && (linkToPhoto !== "null")) {
        var request = new XMLHttpRequest();
        request.open('GET', linkToPhoto, false);
        request.send(); // there will be a 'pause' here until the response to come.
        console.log("Image's request status:" + request.status);
        // the object request will be actually modified
        if (request.status === 404) {
            linkToPhoto = null;
        }
    }


    if ((linkToPhoto !== null) && (linkToPhoto !== undefined) && (linkToPhoto !== "null")) {
        return (
            <div id="photosArtefact">
                <h1>
                    <img
                        src={linkToPhoto}
                        style={imStyle}
                        alt="artefacts_image"
                    />
                </h1>
            </div>)
    } else {
        return (
            <div id="photosArtefact" />
        )
    }
}