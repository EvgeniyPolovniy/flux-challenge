import {AppDispatcher} from './Dispatcher';
import Constants from './Constants';
import {Actions} from './Actions';

let connection;

function init() {
  if (connection) {
    return;
  }
  connection = new WebSocket('ws://localhost:4000');
  connection.onopen = () => {};
  connection.onmessage = (message) => {
    const data = JSON.parse(message.data);
    Actions.changeCurrentPlanet(data)
  };
  connection.onerror = (error) => {
    console.error('error', error);
  };
}

function close() {
  if (!connection) {
    return;
  }
  connection.close();
  connection = null;
}

export default {init, close};
