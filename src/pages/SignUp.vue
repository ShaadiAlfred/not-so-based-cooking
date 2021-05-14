<template>
  <q-page padding>
    <h1 class="text-center">Sign Up</h1>

    <q-form
     @submit.prevent="signUp"
     @reset="reset"
     class="q-gutter-md"
    >
      <q-input
        filled
        v-model="email"
        label="Your email *"
        hint="example@gmail.com"
        lazy-rules
        required
        type="email"
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

      <q-input
        filled
        v-model="confirmPassword"
        label="Confirm Password *"
        hint="Type your password again"
        lazy-rules
        required
        type="password"
        :rules="[
          val => val && val.length > 0 || 'Cannot be empty',
          val => val == $refs.password.value || 'Your password does not match'
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'SignUp',
  data() {
    return {
      email: null,
      password: null,
      confirmPassword: null,
    }
  },
  methods: {
    async signUp() {
      console.log({
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      });

      await firebase.auth().signOut();
      const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
      console.log({ user })
    },
    reset() {
      this.email = null;
      this.password = null;
      this.confirmPassword = null;
    }
  },
}
</script>
