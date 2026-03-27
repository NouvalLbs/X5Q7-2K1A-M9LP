import { defineStore } from 'pinia';
import { NUIHandler } from '../services/NUIHandler';

export const DisplayStores = defineStore({
  id: 'displaystores',

  state: () => {
    return {
      HudVisible: true,
      Hud: {
        ShowHealth: true,
        HealthValue: 50,

        ShowArmour: true,
        ArmourValue: 50,

        ShowHunger: true,
        HungerValue: 50,

        ShowThirst: true,
        ThirstValue: 50,

        ShowStress: true,
        StressValue: 50,
      },
      Speedo: {
        IsInVehicle: false,
      }
    }
  }
})