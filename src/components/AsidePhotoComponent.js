import React from "react";

export default function AsidePhotoComponent(props) {

    const feature = props.feature;
    const imStyle = { width: 225, height: 220};
    let linkToPhoto = null;

    if ((feature !== null) && (feature !== undefined)) {
        linkToPhoto = feature.get('pathToImage');
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