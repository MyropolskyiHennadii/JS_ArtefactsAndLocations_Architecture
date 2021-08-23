import axios from 'axios';
import CommonConstants from './CommonConstants';

class RemoteDataService {

    //locations, categories, artefacts
    async getLocationsCategoriesArtefacts(mapCenter) {
        const data_URL = CommonConstants.getPathToCrossOrigin() + 'get_artefacts_near_map_center';
        const response = await axios.post(data_URL, { params: { mapCenter: mapCenter, thema: 'Architecture' } });
        return response;
    }

    //link to artefact's image (in the case, if there isn't data about photoes in getLocationsCategoriesArtefacts)
    async getLinkToArtefactsImage(feature) {
        if((feature === null) || (feature === undefined)){
            return null;
        }
        const wikipage = feature.get("wiki");
        if((wikipage === null) || (wikipage === undefined)  || (wikipage === "")){
            return null;
        }    
            
        const data_URL = CommonConstants.getPathToCrossOrigin() + 'get_image_url_from_wiki';
        const response = await axios.post(data_URL, { params: { wikipage: wikipage } });
        return response; 
    }
}

export default new RemoteDataService();