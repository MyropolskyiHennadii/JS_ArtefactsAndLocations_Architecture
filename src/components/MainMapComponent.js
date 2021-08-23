import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

//ol
import { Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';

import InfoArtefact from './InfoArtefactComponent';
import AsideFilterComponent from './AsideFilterComponent';

/* just the map */
class MainMap extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            vectorLayer: new VectorLayer(),//layer withartefact's marker
            viewMap: this.props.viewMap,
            lastClickPosition: null//position with last click
        }
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

        //by click on point - show details of plant
        const currentThis = this;
        map.on('click', function (evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature;
            });
            if (feature) {//there is marker
                const artefact = currentThis.props.artefacts.find(x => (x.id_artefacts === feature.get("id_artefact")));
                if (artefact !== undefined) {
                    ReactDOM.render(
                        <React.StrictMode>
                            <InfoArtefact feature={feature}
                                artefact = {artefact}
                                allCategories = {currentThis.props.allCategories}
                                linksToPhotos = {currentThis.props.linksToPhotos}
                                category={null} />
                        </React.StrictMode>,
                        document.getElementById('infoArtefact')
                    )
                }
            } else {//there is no marker
                console.log("New position:" + evt.coordinate)
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
            this.props.handleSelectionPointOnTheMap(this.state.lastClickPosition);
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

    render() {
        const styleMap = {
            width: '90%',
            height: 500,
            border: "double",
            backgroundColor: '#cccccc',
            marginLeft: 'auto',
            marginRight: 'auto'
        }

        //have to do this here because of filter's change
        this.state.vectorLayer.setSource(new VectorSource({
            features: this.props.geoMarkers
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
