import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(Cookies.get('user') || 'null'),
    token: Cookies.get('token') || null,
  }),
  
  actions: {
    setToken(token) {
      this.token = token;
      if (token) {
        try {
          this.user = jwtDecode(token);
          Cookies.set('user', JSON.stringify(this.user));
        } catch (error) {
          console.error('Erreur lors du décodage du token:', error);
          this.user = null;
        }
      } else {
        this.user = null;
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      Cookies.remove('user');
      Cookies.remove('token')
    }
  },
  
  getters: {
    getUser(state) {
      return state.user;
    },
    
    getToken(state) {
      return state.token;
    }, 

    isAuthenticated(){
        return this.user !== null ? true : false;
    }
  }
});
