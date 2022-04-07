<template>
  <div class="auth-layout-wrap" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
    <div class="auth-content">
      <div class="card o-hidden">
        <div class="row">
          <div class="col-md-12">
            <div class="p-4">
              <div class="auth-logo text-center mb-30">
                <h3>Carpinteria <br/> Magic KEy</h3>
              </div>
              <b-form @submit.prevent="formSubmit">
                <b-form-group label="Email Address" class="text-12">
                  <b-form-input
                    class="form-control-rounded"
                    type="text"
                    v-model="email"
                    email
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Password" class="text-12">
                  <b-form-input class="form-control-rounded" type="password" v-model="password"></b-form-input>
                </b-form-group>

                <!-- <b-button block to="/" variant="primary btn-rounded mt-2"
                  >Sign In</b-button
                >-->
                <b-button
                  type="submit"
                  tag="button"
                  class="btn-rounded btn-block mt-2"
                  variant="primary mt-2"
                  :disabled="loading"
                >Acceder</b-button>
                <div v-once class="typo__p" v-if="loading">
                  <div class="spinner sm spinner-primary mt-3"></div>
                </div>
              </b-form>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "SignIn",
  },
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      bgImage: require("@/assets/images/wood.jpg"),
      logo: require("@/assets/images/logo.png"),
      signInImage: require("@/assets/images/photo-long-3.jpg"),
    };
  },

  methods: {
    ...mapActions(["login"]),
    //   validate form
    async formSubmit() {
      console.log("submit!");

      // this.$v.$touch();
      await this.login({ email: this.email, password: this.password });
      console.log("###########################");
      this.$router.go('/app/pages/blank')
    },
  },
};
</script>

<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
</style>
