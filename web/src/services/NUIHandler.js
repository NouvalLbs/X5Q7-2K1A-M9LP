import axios from 'axios';
import { DisplayStores } from '../stores/DisplayStores';

export class NUIHandler {
  static async SendCallbackToClientLua(method, parameters) {
      try {
          const response = await axios.post(`https://${GetParentResourceName()}/${method}`, parameters);
          const data     = response.data;

          if (!data || !data.success) {
              return false;
          }

          return data.data || {};
      } catch(err) {
          return false;
      }
  }
}

export function CloseNUIHandler() {
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    return;
  });
}

export function RecieveNUIMessage() {
  const Display = DisplayStores();

  window.addEventListener('message', (event) => {
    let eventData = event.data;
  });
}