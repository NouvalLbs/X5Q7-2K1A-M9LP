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

    // Existing handlers
    if (eventData.type === 'Indicator_Add') {
      let parsed = JSON.parse(eventData.tempData);
      Display.Indicator_Add(parsed);
    }

    if (eventData.type === 'Indicator_Edit') {
      let parsed = JSON.parse(eventData.tempData);
      Display.Indicator_Edit(parsed.IconId, parsed.NewLabel);
    }

    if (eventData.type === 'Indicator_Remove') {
      Display.Indicator_Remove(eventData.IconId);
    }

    if (eventData.type === 'Indicator_Update') {
      let parsed = JSON.parse(eventData.tempData);
      Display.StoredPlayerInfo = parsed;
    }

    if (eventData.type === 'Indicator_VisibleMode') {
      Display.VisibleMode = eventData.state;
    }

    if (eventData.type === 'Troll_ShowUI') {
      Display.AntiTroll.enable = eventData.show;
    }

    if (eventData.type === 'Troll_UpdateUI') {
      Display.AntiTroll.minleft = eventData.minleft;
      Display.AntiTroll.description = eventData.description;
    }

    // Notification handlers
    if (eventData.type === 'Notification_Add') {
      let parsed = typeof eventData.tempData === 'string' ? JSON.parse(eventData.tempData) : eventData.tempData;
      Display.Notification_Add(parsed);
    }

    if (eventData.type === 'Notification_Remove') {
      Display.Notification_Remove(eventData.notificationId);
    }

    if (eventData.type === 'Notification_Clear') {
      Display.Notification_Clear();
    }

    if (eventData.type === 'Notification_RemoveByType') {
      Display.Notification_RemoveByType(eventData.notificationType);
    }
  });
}