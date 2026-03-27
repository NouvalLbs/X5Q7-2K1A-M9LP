const isBrowser = typeof mp === 'undefined';

export function sendToServer(eventName, data = {}) {
  if (isBrowser) {
    console.log('[CEF DEV] sendToServer:', eventName, data);
    return;
  }
  mp.trigger('__cs_event', JSON.stringify({ e: eventName, d: data }));
}

export function receiveFromServer(eventName, callback) {
  if (isBrowser) {
    console.log('[CEF DEV] receiveFromServer registered:', eventName);
    window.__cefDevHandlers = window.__cefDevHandlers || {};
    window.__cefDevHandlers[eventName] = callback;
    return;
  }
  mp.events.add(eventName, (argsJson) => {
    try {
      const parsed = typeof argsJson === 'string' ? JSON.parse(argsJson) : argsJson;
      callback(parsed?.d ?? parsed);
    } catch {
      callback(argsJson);
    }
  });
}

// Helper dev: simulate server emit dari browser console
// window.__cefEmit('eventName', { key: 'value' })
if (isBrowser) {
  window.__cefEmit = (eventName, data) => {
    const handler = window.__cefDevHandlers?.[eventName];
    if (handler) handler(data);
    else console.warn('[CEF DEV] No handler for:', eventName);
  };
}