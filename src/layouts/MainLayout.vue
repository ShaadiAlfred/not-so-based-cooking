<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          title="Home"
          icon="home"
          aria-label="Home"
          to="/"
        />

        <q-toolbar-title>
          Not So Based Cooking
        </q-toolbar-title>

        <q-space />
        <q-btn
          flat
          dense
          class="q-mr-xs"
          :to="{ path: 'sign_up' }"
          v-if="!isSignedIn"
        >
          Sign Up
        </q-btn>

        <q-btn
          flat
          round
          dense
          icon="logout"
          title="Sign Out"
          class="q-mr-xs"
          @click="signOut"
          v-if="isSignedIn"
        />

        <q-btn
          flat
          round
          dense
          icon="login"
          title="Sign In"
          :to="{ name: 'sign_in' }"
          class="q-mr-xs"
          v-else
        />

        <q-btn flat round dense icon="search" class="q-mr-xs" />
        <q-btn
          flat
          round
          dense
          title="Toggle dark mode"
          icon="dark_mode"
          :color="this.$q.dark.isActive ? 'black' : 'white'"
          class="q-mr-xs"
          @click="toggleDarkMode()"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'MainLayout',
  computed: {
    isSignedIn() {
      return this.$store.state.isSignedIn;
    }
  },
  methods: {
    toggleDarkMode() {
      this.$q.dark.toggle();
    },
    async signOut() {
      await firebase.auth().signOut();
      await firebase.auth().signInAnonymously();

      this.$q.notify({
        type: 'positive',
        icon: 'done',
        message: 'Signed out successfully!'
      });

      if (this.$route.path === '/recipe/new/md') {
        await this.$router.push({ path: '/' });
      }
    }
  },
  watch: {
    '$q.dark.isActive' (val) {
      if (val) {
        document.head.querySelector('link[rel="icon"]').href = 'icons/favicon.png';
        this.$q.cookies.set('dark_mode', 'true', { expires: '365d' });
      } else {
        document.head.querySelector('link[rel="icon"]').href = 'icons/favicon_2.png';
        this.$q.cookies.set('dark_mode', 'false', { expires: '365d' });
      }
    },
  },
  async created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (! user.isAnonymous) {
          this.$store.commit('setSignedUser', user.displayName);
        } else {
          this.$store.commit('unSetSignedUser');
        }
      } else {
        this.$store.commit('unSetSignedUser');
      }
    });

    if (this.$q.cookies.has('dark_mode')) {
      this.$q.cookies.get('dark_mode') ? this.$q.dark.set(true) : this.$q.dark.set(false);
    } else {
      this.$q.cookies.set('dark_mode', 'false', { expires: '365d' });
    }
  }
}
</script>
