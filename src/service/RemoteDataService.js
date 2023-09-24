import axios from 'axios';
import CommonConstants from './CommonConstants';

class RemoteDataService {

    //locations, categories, artefacts
    async getLocationsCategoriesArtefacts(mapCenter) {

        //post for getting region data:
        //const response = await axios.post(CommonConstants.getPathToCrossOriginPoint(), { token: CommonConstants.getMapAccessToken(), thema: 'Architecture', region: 'bayern_germany', version: '1.2.0' } );
        //post for getting artefacts near the point:
        const response = await axios.post(CommonConstants.getPathToCrossOriginPoint(), { token: CommonConstants.getMapAccessToken(), thema: 'Architecture', region: '', version: '1.2.0', longitude: mapCenter[0], latitude: mapCenter[1], precision: 0.1 } );

        //get for creation region data
        //const response = await axios.get(CommonConstants.getPathToCrossOriginCreateRegion(), { params: {thema: 'Architecture', region: 'bayern_germany', version: '' } });

        //post for gettting point data
        //const response = await axios.post(CommonConstants.getPathToCrossOriginPoint(), { params: {token: CommonConstants.getMapAccessToken(), thema: 'Architecture',  region: '', longitude: mapCenter[0], latitude: mapCenter[1]} });

        return response;
    }

    //search places by name async
    //https://github.com/jcblw/geode/blob/master/README.md 
    //https://www.geonames.org/export/geonames-search.html     
    //http://www.geonames.org/data-sources.html
    //http://api.geonames.org/searchJSON?username=myropolsky&country=US&lang=en&name=asdgfsdgSG

    async findPlaceByName(searchName, language) {
        const data_URL = "http://api.geonames.org/searchJSON?username=" + CommonConstants.getUserGeode() + "&lang="+language+"&name=" + searchName;
        let response = null;
        if( searchName.trim().length < 4 ){
            return "Place have to have more than 3 letters";
        }
        try {
            response = await axios.post(data_URL);
        } catch (error) {
            response = error;
        }
        return response;
    }

}

export default new RemoteDataService();