<template>
  <q-page padding>
    <h1 class="text-center">Sign In</h1>

    <q-form
      @submit.prevent="signIn"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="email"
        label="Your email *"
        hint="example@gmail.com"
        required
        type="email"
        autofocus
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="password"
        ref="password"
        label="Password *"
        lazy-rules
        required
        type="password"
        :rules="[val => val && val.length > 0 || 'Cannot be empty']"
      />

      <div>
        <q-btn label="Sign In" type="submit" color="primary"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'SignIn',
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    async signIn() {
      await firebase.auth().signOut();

      try {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);

        this.$q.notify({
          type: 'positive',
          icon: 'done',
          message: 'Signed in successfully!'
        });

        if (this.$route.query.from) {
          await this.$router.push({ path: this.$route.query.from });
        } else {
          await this.$router.push({ path: '/' });
        }
      } catch (e) {
        if (e.code === 'auth/user-not-found') {
          this.$q.notify({
            type: 'negative',
            icon: 'error',
            message: 'Email was not found in our database. Check the email you entered, or sign up!'
          });
        } else if (e.code === 'auth/wrong-password') {
          this.$q.notify({
            type: 'negative',
            icon: 'error',
            message: 'Wrong password!'
          });
        }

        await firebase.auth().signInAnonymously();
      }
    }
  },
}
</script>
