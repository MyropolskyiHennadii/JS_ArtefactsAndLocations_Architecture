import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

//ol
import { Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import * as olProj from 'ol/proj';

import InfoArtefact from './InfoArtefactComponent';
import AsideFilterComponent from './AsideFilterComponent';
import AsideFindItComponent from './AsideFindItComponent';
import GeomarkersService from '../service/GeomarkersService';

/* just the map */
class MainMap extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            vectorLayer: new VectorLayer(),//layer withartefact's marker
            viewMap: this.props.viewMap,
            lastClickPosition: null//position with last click
        }
         ReactDOM.render(<AsideFindItComponent 
            FindPlaceByCoordinate = {this.FindPlaceByCoordinate}
            t = {this.props.t}
            />, document.getElementById('findIt'));
    }

    componentDidMount() {
        this.doMapWithMarkers();
    }

    //doing map and markers (layer)//componentDidMount()
    doMapWithMarkers() {

        let map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                //markers
                this.state.vectorLayer
            ],
            view: this.props.viewMap
        });

        //by click on point - show details of artefact
        const currentThis = this;
        map.on('click', function (evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature;
            });
            if (feature) {//there is marker
                const artefact = currentThis.props.artefacts.find(x => (x.id_artefacts === feature.get("id_artefact")));
                if (artefact !== undefined) {
                    ReactDOM.render(
                            <InfoArtefact feature={feature}
                                artefact={artefact}
                                allCategories={currentThis.props.allCategories}
                                category={null} />,
                        document.getElementById('infoArtefact')
                    )
                }
            } else {//there is no artefact
                console.log("New position:" + olProj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
                currentThis.setState({ lastClickPosition: evt.coordinate });
            }
        });
        return map;
    }

    //by selection new position
    SelectPositionAndShowItWithArtefacts() {
        ReactDOM.render(
            <React.StrictMode>
                <InfoArtefact feature={null}
                    artefact={null}
                    allCategories={null}
                    category={null} />
            </React.StrictMode>,
            document.getElementById('infoArtefact')
        )
        if (this.state.lastClickPosition !== null) {
            this.state.viewMap.setZoom(11);
            this.state.viewMap.setCenter(this.state.lastClickPosition);
            this.props.handleSelectionPointOnTheMap(olProj.transform(this.state.lastClickPosition, 'EPSG:3857', 'EPSG:4326'));
        } else {
            ReactDOM.render(
                <React.StrictMode>
                    <AsideFilterComponent message={"PointIsntDefined"}
                        allCategories={null}
                        artefacts={null}
                        refreshGeomarkers={null}
                    />
                </React.StrictMode>,
                document.getElementById('filters'))
        }
    }

    //by selection point in left Aside (id = FindIt)
    FindPlaceByCoordinate = (e) => (
        this.setState({ lastClickPosition: olProj.transform(e, 'EPSG:4326', 'EPSG:3857') })
    )

    render() {
        const styleMap = {
            width: '90%',
            height: 500,
            border: "double",
            backgroundColor: '#cccccc',
            marginLeft: 'auto',
            marginRight: 'auto'
        }

        //have to do this here because of filter's change and also we need to add one marker = lastClickPosition
        let geomarkers = this.props.geoMarkers;
        if (this.state.lastClickPosition !== null) {//add last position to geomarkers
            let selectedPoint = GeomarkersService.setFeatureForSelectedPoint(olProj.transform(this.state.lastClickPosition, 'EPSG:3857', 'EPSG:4326'));
            if (selectedPoint !== null) {
                if (geomarkers === null) {
                    geomarkers = [selectedPoint];
                } else {
                    //at first remove old lastClickPosition
                    const oldSelectedPoint = geomarkers.find(x => (x.get("id") === "_selectedPoint"));
                    if ((oldSelectedPoint !== null) && (oldSelectedPoint !== undefined)) {
                        const indexOld = geomarkers.indexOf(oldSelectedPoint);
                        if (indexOld >= 0) {
                            geomarkers.splice(indexOld, 1);
                        }
                    }
                    //and then add new
                    geomarkers.push(selectedPoint);
                }
            }
        }

        this.state.vectorLayer.setSource(new VectorSource({
            features: geomarkers
        }));

        const t = this.props.t;
        return (
            <Fragment>
                <button onClick={this.SelectPositionAndShowItWithArtefacts.bind(this)}>{t('SelectPosition')}</button>
                <p></p>
                <div id='map' style={styleMap}>
                </div>
            </Fragment>
        )
    }
}

export default MainMap
