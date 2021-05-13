<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="home"
          aria-label="Home"
          to="/"
        />

        <q-toolbar-title>
          Not So Based Cooking
        </q-toolbar-title>

        <q-space />

        <q-btn flat round dense icon="search" class="q-mr-xs" />
        <q-btn
          flat
          round
          dense
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
  async mounted() {
    await firebase.auth().signInAnonymously();
  },
  methods: {
    toggleDarkMode() {
      this.$q.dark.toggle();
    },
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
  created() {
    if (this.$q.cookies.has('dark_mode')) {
      this.$q.cookies.get('dark_mode') ? this.$q.dark.set(true) : this.$q.dark.set(false);
    } else {
      this.$q.cookies.set('dark_mode', 'false', { expires: '365d' });
    }
  }
}
</script>
