import { defineStore } from 'pinia';
import { NUIHandler } from '../services/NUIHandler';

export const DisplayStores = defineStore({
  id: 'displaystores',

  state: () => {
    return {
      Hud: {
        ShowHealth: true,
        ShowArmour: true,
        ShowHunger: true,
        ShowThirst: true,
        ShowStress: true,
      }
    }
  }
})