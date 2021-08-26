import axios from 'axios';
import CommonConstants from './CommonConstants';

class RemoteDataService {

    //locations, categories, artefacts
    async getLocationsCategoriesArtefacts(mapCenter) {
        const data_URL = CommonConstants.getPathToCrossOrigin() + 'get_artefacts_near_map_center';
        const response = await axios.post(data_URL, { params: { mapCenter: mapCenter, thema: 'Architecture' } });
        return response;
    }

}

export default new RemoteDataService();