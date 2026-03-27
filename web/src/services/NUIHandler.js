import { DisplayStores } from '../stores/DisplayStores';

export class NUIHandler {
  static SendEventToServer(eventName, payload = {}) {
    try {
      const data = {
        e: eventName,
        d: payload
      };
      
      if (window.cef) {
        window.cef.emit('client_event', JSON.stringify(data));
      } else if (window.external) {
        window.external.emit(JSON.stringify(data));
      }
      
      return true;
    } catch (err) {
      console.error('Failed to send event to server:', err);
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

  const handleEvent = (eventData) => {
    const data = typeof eventData === 'string' ? JSON.parse(eventData) : eventData;
    
    if (data.e === 'updateHud') {
      Display.UpdateHud(data.d);
    }
    
    if (data.e === 'setHudVisible') {
      Display.SetHudVisible(data.d.visible);
    }
  };

  if (window.cef) {
    window.cef.on('client_event', (data) => {
      handleEvent(data);
    });
    
    window.addEventListener('cef_event', (event) => {
      handleEvent(event.detail);
    });
  }

  window.addEventListener('message', (event) => {
    handleEvent(event.data);
  });

  setTimeout(() => {
    NUIHandler.SendEventToServer('uiReady', {});
  }, 100);
}