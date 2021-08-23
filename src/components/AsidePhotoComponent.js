import React from "react";

export default function AsidePhotoComponent(props) {

    //const [linkToPhoto, setLinkToPhoto] = useState(null);

    const feature = props.feature;
    const imStyle = { width: 225, height: 220};
    let linkToPhoto = null;

    if ((feature !== null) && (feature !== undefined)) {
        const id_artefact = feature.get("id_artefact");
        if ((props.linksToPhotos !== null) && (props.linksToPhotos !== undefined) && (id_artefact !== undefined) && (id_artefact !== null)) {
            linkToPhoto = props.linksToPhotos[id_artefact];
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