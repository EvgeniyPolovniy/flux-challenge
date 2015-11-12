import {AppDispatcher} from './Dispatcher';
import Constants from './Constants';
import {SithStorage} from './SithStorage';
import MicroEvent from './microevent';

export let Store = {
  curentPlanet: {
    name: 'Unknown Planet',
    id: 0
  },
  sithList: [null, null, null, null, null],
  danger: false,
  getPlanet: function() {
    return this.curentPlanet;
  },
  setPlanet: function(data) {
    this.curentPlanet.name = data.name;
    this.curentPlanet.id = data.id;
  },

  getSithList: function() {
    return this.sithList;
  },
  setSithList: function(data) {
    this.sithList = data;
  },

  isDanger: function() {
    return this.danger;
  },
  setDanger: function(status) {
    this.danger = status;
  },
  checkDanger: function() {
    let planet = Store.getPlanet();
    let result = Store.sithList.reduce(function(ans, current) {
      if ((current != null) && (current.homeworld.id == planet.id)){
        return ans = true;
      }
      return ans;
    }, false);
    Store.setDanger(result);
  }
}

MicroEvent.mixin(Store);

AppDispatcher.register( function( payload ) {
  
  switch( payload.actionType ) {
    case Constants.CHANGE_CURRENT_PLANET:
      Store.setPlanet(payload.data);
      Store.checkDanger();
      Store.trigger(Constants.CHANGE_CURRENT_PLANET);
      break;
    case Constants.CHANGE_SITH_LIST:
      Store.setSithList(payload.data);
      Store.trigger(Constants.CHANGE_SITH_LIST);
      break;
  }

  return true;

});