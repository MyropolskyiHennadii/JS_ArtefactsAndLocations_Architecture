import axios from 'axios';
import CommonConstants from './CommonConstants';

class RemoteDataService {

    //locations, categories, artefacts
    async getLocationsCategoriesArtefacts(mapCenter) {
        //it is with spring-boot app:
        //const data_URL = CommonConstants.getPathToCrossOrigin() + 'get_artefacts_near_map_center';
        //const response = await axios.post(data_URL, { params: { mapCenter: mapCenter, thema: 'Architecture' } });

        //it is with servlet-application
        //POST for region
        //const response = await axios.post(CommonConstants.getPathToCrossOrigin(), { params: {thema: 'Architecture', region: 'bayern_germany' } });
        //GET for point
        //const response = await axios.get(CommonConstants.getPathToCrossOrigin(), { params: {thema: 'Architecture', longitude: mapCenter[0], latitude: mapCenter[1]} });
        //post for point
        const response = await axios.post(CommonConstants.getPathToCrossOrigin(), { params: {token: CommonConstants.getMapAccessToken(),thema: 'Architecture',  region: '', longitude: mapCenter[0], latitude: mapCenter[1]} });
        //get for creation region data
        //const response = await axios.get('http://localhost:8080/ArtefactsLocation_API_war/createArtefactsForRegionServlet', { params: {thema: 'Architecture', region: 'bayern_germany', version: '1.0.6' } });
        return response;
    }

    //search places by name async
    //https://github.com/jcblw/geode/blob/master/README.md 
    //https://www.geonames.org/export/geonames-search.html     
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