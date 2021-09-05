//ol
import 'ol/ol.css';
import { fromLonLat } from "ol/proj";
//
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Style
} from 'ol/style';

import SynonymsAndLanguages from './SynonymsAndLanguages';

class GeomarkersService {

    setStyleForFeature(featureColor) {
        return new Style({
            image: new CircleStyle({
                radius: 5,
                fill: new Fill({ color: featureColor }),
                stroke: new Stroke({
                    color: 'white',
                    width: 2,
                }),
            }),
        })
    }

    //form actual array of geomarkers. 
    //centerLong: center of map, longitude
    //centerLat: center of map, latitude
    //geopositions: array with plants and geopositions
    //mostCommonPlant: Map with frequency plants (by id_gbif) in geopositions
    //plants: array with complete plants (with all fields)
    //plantsEvents: flowering plants
    //lang: browser's language
    getMarkersArray(artefacts, lang) {

        //form array of geomarkers
        const geomarkers = [];
        console.log("Size of full artefacts:" + artefacts.length);
        for (let index = 0; index < artefacts.length; index++) {

            let pathToArtefactsImage = null;
            if((artefacts[index].artefactsImage !== null) && (artefacts[index].artefactsImage !== undefined)){
                pathToArtefactsImage = artefacts[index].artefactsImage.path_to_image;
            }
            const geoMarker = new Feature(
                {
                    type: 'geoMarker',
                    geometry: new Point(fromLonLat([artefacts[index].artefactsLocation.longitude, artefacts[index].artefactsLocation.latitude])),
                    id: index + "_" + artefacts[index].artefactsLocation.id_artefacts_locations,
                    id_artefact: artefacts[index].id_artefacts,//id of artefact
                    longitude: artefacts[index].artefactsLocation.longitude,
                    latitude: artefacts[index].artefactsLocation.latitude,
                    pathToImage: pathToArtefactsImage,
                    name: "",
                    wiki: "",
                    author: "",
                    event: "",
                    categories: ""
                }
            );

            geoMarker.setStyle(
                this.setStyleForFeature('#123cb3')
            );

            geomarkers.push(geoMarker);
        }

        return geomarkers;
    }

    //filter artefacts by category
    formingArtefactsArrayByCategory(artefacts, allCategories, id) {
        const category = allCategories.find(x => (Number(x.id_category) === Number(id)));
        if (category === undefined) {//all artefacts
            return artefacts;
        }
        const filteredArtefacts = [];//with filter
        for (let i = 0; i < artefacts.length; i++) {
            for (let j = 0; j < artefacts[i].categories.length; j++) {
                if (Number(category.id_category) === Number(artefacts[i].categories[j].id_category_artefact)) {
                    filteredArtefacts.push(artefacts[i]);
                }
            }
        }
        console.log("Size of filtered artefacts after category selection:" + filteredArtefacts.length);
        return filteredArtefacts;
    }

    //fill feature with properties
    fillFeatureWithProperties(feature, artefact, lang, allCategories) {
        const nameAndReference = SynonymsAndLanguages.getArtefactyName(artefact, lang);
        feature.set("name", nameAndReference.artefact_name);
        feature.set("wiki", nameAndReference.web_reference);
        //events:
        if (artefact.events.length > 0) {
            //sorry we'll do it because of duplicates in DB
            const events = new Set();
            for (let index = 0; index < artefact.events.length; index++) {
                events.add(artefact.events[index].event.trim() + " " + artefact.events[index].event_begin.trim() + " - " + artefact.events[index].event_end.trim() + "; ")
                //events = "" + events + artefact.events[index].event + " " + artefact.events[index].event_begin + " - " + artefact.events[index].event_end + "; ";
            }
            //and at least
            let strEvents = "";
            events.forEach(
                function (value) {
                    strEvents = "" + value;
                }
            );
            feature.set("event", strEvents);
        } else {
            feature.set("event", "");
        }
        //authors
        if (artefact.authors.length > 0) {
            //sorry we'll do it because of duplicates in DB
            const authors = new Set();
            for (let index = 0; index < artefact.authors.length; index++) {
                authors.add(artefact.authors[index].author_name.trim() + "; ")
                //authors = "" + authors + artefact.authors[index].author_name + "; ";
            }
            //and at least
            let strAuthors = "";
            authors.forEach(function (value) {
                strAuthors = "" + value;
            });
            feature.set("author", strAuthors);
        }
        else {
            feature.set("author", "");
        }
        //categories:
        let strCategories = "";
        for (let index = 0; index < artefact.categories.length; index++) {
            const idCategory = artefact.categories[index].id_category_artefact;
            const mainCategory = allCategories.find(x => (Number(x.id_category) === Number(idCategory)));//in different languages
            if (mainCategory !== undefined) {
                const nameAndWebReference = SynonymsAndLanguages.getCategoryName(lang, mainCategory);
                strCategories = "" + strCategories + nameAndWebReference.category_name.substring(3) + "; "
            }
        }
        feature.set("categories", strCategories);

        return feature;
    }

    //set feature for selected point
    setFeatureForSelectedPoint(coordinates) {
        let selectedPoint = null;
        if (coordinates !== null) {
            selectedPoint = new Feature(
                {
                    type: 'geoMarker',
                    geometry: new Point(fromLonLat([coordinates[0], coordinates[1]])),
                    id: "_selectedPoint",
                    longitude: coordinates[0],
                    latitude: coordinates[1]
                }
            );
            selectedPoint.setStyle(
                this.setStyleForFeature('#ff4500')
            );
        }
        return selectedPoint;
    }
}

export default new GeomarkersService();