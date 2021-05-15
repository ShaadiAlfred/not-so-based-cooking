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
        v-model="name"
        label="This will be displayed in the recipes you add"
        required
        type="text"
        autofocus
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="email"
        label="Your email *"
        hint="example@gmail.com"
        required
        type="email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="password"
        ref="password"
        label="Password *"
        required
        type="password"
        lazy-rules
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
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    }
  },
  methods: {
    async signUp() {
      const credential = await firebase.auth.EmailAuthProvider.credential(this.email, this.password);

      await firebase.auth().currentUser.linkWithCredential(credential);

      await firebase.auth().signOut();

      await firebase.auth().signInWithEmailAndPassword(this.email, this.password);

      const user = await firebase.auth().currentUser;

      try {
        await user.updateProfile({
          displayName: this.name,
        });
      } catch (e) {
        console.error(e);
      }

      this.$q.notify({
        type: 'positive',
        message: 'Signed up successfully!'
      });

      await this.$router.push({ path: '/' });
    },
    reset() {
      this.email = null;
      this.password = null;
      this.confirmPassword = null;
    }
  },
}
</script>
