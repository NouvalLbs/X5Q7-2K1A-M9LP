import { defineStore } from 'pinia';
import { sendToServer } from '@/services/CefHandler';

export const useDisplayStore = defineStore('display', {
  state: () => ({
    Hud: {
      ShowHealth: true,
      ShowArmour: true,
      ShowHunger: true,
      ShowThirst: true,
      ShowStress: true,
    }
  }),
  actions: {
    /*
    setVisible(val) {
      this.visible = val;
    },
    notifyReady() {
      sendToServer('uiReady', {});
    },
    */
  },
});