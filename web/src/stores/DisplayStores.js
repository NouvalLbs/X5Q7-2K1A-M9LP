import { defineStore } from 'pinia';
import { NUIHandler } from '../services/NUIHandler';

export const DisplayStores = defineStore({
  id: 'displaystores',

  state: () => {
    return {
      VisibleMode: false
    }
  },

  actions: {
    
  }
})