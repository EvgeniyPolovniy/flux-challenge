import {AppDispatcher} from './Dispatcher';
import Constants from './Constants';
import {Actions} from './Actions';
import {Store} from './Store';

const urlForSith = "http://localhost:3000/dark-jedis/";

export let SithStorage = {
  init: function() {
    if (this.isEmptySithList()) {
      this.newSith(3616, 2);
    }
  },
  isEmptySithList: function() {
    let result = Store.sithList.reduce(function(ans, current) {
      if ((current == null) && (ans == true) ){
        return ans = true;
      }
      return false;
    }, true);
    return result;
  },
  hasEmptySithListItem: function() {
    let result = Store.sithList.some(function(slot) {
      return slot == null;
    });
    return result;
  },
  newSith: function (sithId, loadTo) {
    let url = urlForSith + sithId;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        let data = JSON.parse(xhr.response);
        console.log(data);
        SithStorage.addNewSith(data, loadTo);
      }
    }

    xhr.send();
    if (Store.isDanger()) xhr.abort();
  },
  addNewSith: function(data, loadTo) {
    SithStorage.newList(Store.sithList, data, loadTo);
    let list = Store.sithList;
    if (SithStorage.hasEmptySithListItem() && (loadTo+1 < 5) && (list[loadTo+1] == null)) {
      let sithId = data.apprentice.id;
      SithStorage.newSith(sithId, loadTo+1);
    }
    if (SithStorage.hasEmptySithListItem() && (loadTo-1 > -1) && (list[loadTo-1] == null)) {
      let sithId = data.master.id;
      SithStorage.newSith(sithId, loadTo-1);
    }
  },
  newList:  function(list, newSith, loadTo) {
    let newList = list;
    newList.splice(loadTo, 1, newSith);
    Actions.changeSithList(newList);
  },
  upButton: function() {
    let newList = Store.sithList;
    newList.splice(newList.length-2, 2);
    newList.splice(0, 0, null, null);
    Actions.changeSithList(newList);
    let sithId = newList[2].master.id;
    SithStorage.newSith(sithId, 1);
  },
  downButton: function() {
    let newList = Store.sithList;
    newList.splice(0, 2);
    newList.splice(newList.length, 0, null, null);
    Actions.changeSithList(newList);
    let sithId = newList[2].apprentice.id;
    SithStorage.newSith(sithId, 3);
  }
}