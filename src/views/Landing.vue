<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6>
        <img src="../assets/image/image1.png" />
      </v-flex>
      <v-flex xs12 sm12 md5 align-self-center>
        <div justify="center" align="center">
          <img src="../assets/image/logo.png" />
          <h4>Login to an existing account</h4>
          <v-form ref="form" @submit.prevent="submit()">
            <v-text-field
              id="auth-login-input-username"
              v-model="username"
              label="Username"
              :rules="[validation.required('Username')]"
              class="mt-4 custom-validation"
              filled
              rounded
              append-icon="mdi-account-multiple"
            />
            <v-text-field
              id="auth-login-input-password"
              v-model="password"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[validation.required('Password')]"
              :type="showPassword ? 'text' : 'password'"
              class="custom-validation"
              filled
              rounded
              @click:append="showPassword = !showPassword"
            />
            <v-checkbox label="Remember Me" color="primary" />
            <v-btn
              id="auth-login-btn-submit"
              justify-end
              block
              color="grey"
              type="submit"
              class="white--text"
            >
              Login
            </v-btn>
          </v-form>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import validation from '@/validation';

export default Vue.extend({
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    showPassword: false,
    validation,
  }),
  computed: {
    ...mapGetters(['token', 'authenticatedUser']),
  },
  methods: {
    ...mapActions(['signIn', 'setLoading', 'setSnackbar']),
    async submit() {
      if (!this.validate()) return;
      this.setLoading(true);

      const payload = {
        username: this.username,
        password: this.password,
      };

      try {
        await this.signIn(payload);
        if (this.token) {
          this.$router.push('/user/index');
        }
        this.setLoading(false);
      } catch (e) {
        this.setLoading(false);
        this.setSnackbar({
          isVisible: true,
          message: e,
          color: 'error',
        });
      }
    },

    validate() {
      return (this.$refs.form as Vue & { validate: () => boolean }).validate();
    },
  },
});
</script>
