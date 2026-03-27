import { defineStore } from 'pinia';
import { NUIHandler } from '../services/NUIHandler';

export const DisplayStores = defineStore({
  id: 'displaystores',

  state: () => ({
    HudVisible: false,
    Hud: {
      ShowHealth: true,
      HealthValue: 100,
      ShowArmour: true,
      ArmourValue: 0,
      ShowHunger: true,
      HungerValue: 100,
      ShowThirst: true,
      ThirstValue: 100,
      ShowStress: true,
      StressValue: 0,
    },
    Speedo: {
      IsInVehicle: false,
    }
  }),

  actions: {
    UpdateHud(data) {
      this.Hud.ShowHealth = data.ShowHealth;
      this.Hud.HealthValue = data.HealthValue;
      
      this.Hud.ShowArmour = data.ShowArmour;
      this.Hud.ArmourValue = data.ArmourValue;
      
      this.Hud.ShowHunger = data.ShowHunger;
      this.Hud.HungerValue = data.HungerValue;
      
      this.Hud.ShowThirst = data.ShowThirst;
      this.Hud.ThirstValue = data.ThirstValue;
      
      this.Hud.ShowStress = data.ShowStress;
      this.Hud.StressValue = data.StressValue;
    },
    
    SetHudVisible(visible) {
      this.HudVisible = visible;
    }
  }
})