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
    /*
      if (eventData.type === 'Indicator_Add') {
        let parsed = JSON.parse(eventData.tempData);
        Display.Indicator_Add(parsed);
      }
    */
  };

  window.addEventListener('message', (event) => {
    const eventData = event.data;
    handleEvent(eventData);
  });

  if (window.cef) {
    window.cef.on('message', (data) => {
      try {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        handleEvent(parsed);
      } catch (err) {
        console.error('Failed to parse CEF message:', err);
      }
    });
  }

  window.EmitReady = () => {
    NUIHandler.SendEventToServer('uiReady', {});
  };

  setTimeout(() => {
    if (window.EmitReady) {
      window.EmitReady();
    }
  }, 100);
}