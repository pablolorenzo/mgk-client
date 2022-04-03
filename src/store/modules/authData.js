import firebase from "firebase/app";
import "firebase/auth";
import { AuthService } from '../../_services';
export default {
  state: {
    loggedInUser:
      localStorage.getItem("userInfo") != null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    loading: false,
    error: null,
    endpoints: {
      obtainJWT: 'https://mgk-be.herokuapp.com/api/token',
      refreshJWT: 'https://mgk-be.herokuapp.com/api/token/refresh'
    },
    jwt: null
  },
  getters: {
    loggedInUser: state => state.loggedInUser,
    loading: state => state.loading,
    error: state => state.error
  },
  mutations: {
    updateToken(state, newToken){
      localStorage.setItem('t', newToken);
      state.jwt = newToken;
    },
    removeToken(state){
      localStorage.removeItem('t');
      state.jwt = null;
    },
    setUser(state, data) {
      state.loggedInUser = data;
      state.loading = false;
      state.error = null;
      
    },
    setLogout(state) {
      state.loggedInUser = null;
      state.loading = false;
      state.error = null;
      // this.$router.go("/");
    },
    setLoading(state, data) {
      state.loading = data;
      state.error = null;
    },
    setError(state, data) {
      state.error = data;
      state.loggedInUser = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async login({commit}, data) {
      commit("clearError");
      commit("setLoading", true);
      console.log("LOGINNNNN DATAAAAAAAAAAA");
      const response = await AuthService.getToken(data);
      console.log("-----------------------");
      console.log(response);
      this.commit('updateToken', response.data.access)
      this.commit('setUser', data)

      return true;
      /*firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(user => {
          const newUser = {uid: user.user.uid};
          localStorage.setItem("userInfo", JSON.stringify(newUser));
          commit("setUser", {uid: user.user.uid});
          console.log("user");
        })
        .catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // console.log(error);
          localStorage.removeItem("userInfo");
          commit("setError", error);
          // ...
        });*/
    },

    signOut({commit}) {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            localStorage.removeItem("userInfo");
            commit("setLogout");
          },
          _error => {}
        );
    }
  }
};
