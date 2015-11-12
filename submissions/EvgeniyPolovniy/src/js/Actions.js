import {AppDispatcher} from './Dispatcher';
import Constants from './Constants';

export let Actions = {
  changeCurrentPlanet(data) {
    AppDispatcher.dispatch({
      actionType: Constants.CHANGE_CURRENT_PLANET,
      data: data
    });
  },
  changeSithList(data) {
    AppDispatcher.dispatch({
      actionType: Constants.CHANGE_SITH_LIST,
      data: data
    });
  }
};