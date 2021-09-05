import React, { Fragment } from 'react';

export default function FoundPlacesComponent(props) {

    const responseGeonames = props.responseGeonames;
    if ((responseGeonames !== null) && (responseGeonames !== undefined)) {
        if ((responseGeonames.message !== undefined) || (typeof (responseGeonames) == 'string')) {
            let message = responseGeonames.message !== undefined ? responseGeonames.message : responseGeonames;
            return (
                <div>
                    <h3>{message}</h3>
                </div>)
        } else {
            //by deafult we receive only 100 results; otherwise see: https://www.geonames.org/export/geonames-search.html
            //now transform data to list:
            let arrayList = [];
            const data = responseGeonames.data.geonames;

            if (data.length === 0) {//there is no data
                return (
                    <div>
                        <h3>There is no data</h3>
                    </div>)
            } else {

                const clickPlace = (e) => (
                    //console.log("point: " + e.target.id),
                    props.findPlaceByCityName([data[Number(e.target.id)].lng, data[Number(e.target.id)].lat])
                );

                for (let i = 0; i < data.length; i++) {
                    arrayList.push(
                        <div key={"div" + i} onClick={clickPlace}>
                            <li style={{ height: '50px', border: '1px solid black' }} id={i} key={i}>{data[i].name + ": " + data[i].countryCode + ". Long: " + data[i].lng + ", Lat: " + data[i].lat}
                            </li>
                        </div>
                    );
                }

                return (
                    <ol>
                        {arrayList};
                    </ol>)
            }
        }
    } else {
        return (
            <Fragment>
            </Fragment>
        )
    }

}