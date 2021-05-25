<template>
  <q-page padding>
    <h3 class="text-center">Newest Recipes!</h3>
    <q-infinite-scroll
      v-if="recipes.length"
      @load="loadMore"
      ref="loadMoreEl"
      :offset="50"
    >
      <div
        v-for="(recipePair, index) in intoPairs(recipes)"
        :key="index"
        class="row"
      >
        <div
          v-for="(oneRecipe, idx) in recipePair"
          :key="idx"
          class="col-md-5 q-mx-auto q-mb-md"
        >
          <q-card
            class="my-card cursor-pointer"
            @click="() => $router.push({ name: 'recipe', params: { slug: oneRecipe.slug } })"
          >
            <q-img
              :src="oneRecipe.image_url"
              ratio="1"
            />
            <q-card-section>
              <div class="text-h6">{{ oneRecipe.title }}</div>
              <div class="text-subtitle2">by <strong>{{ oneRecipe.written_by }}</strong></div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>

    <transition
      appear
      enter-active-class="animated fadeIn"
    >
      <div v-if="! isThereMore" class="row">
        <div class="col-12 q-mx-auto text-center">
          <q-badge rounded color="primary" class="text-h6" label="No more recipes... 💔" />
        </div>
      </div>
    </transition>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <transition
        appear
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutDown"
      >
        <q-btn
          fab
          icon="add"
          color="accent"
          v-if="showFab"
          :to="{ name: isSignedIn ? 'add_recipe_with_markdown' : 'add_recipe' }"
        />
      </transition>
    </q-page-sticky>
    <q-scroll-observer
      @scroll="fabScroll"
      scroll-target="body"
    />
  </q-page>
</template>

<script>
import { getPublishedRecipes } from 'src/helpers/recipes';
import { intoPairs } from 'src/helpers/general';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Index',
  data() {
    return {
      recipes: [],
      showFab: false,
      isThereMore: true,
    }
  },
  computed: {
    isSignedIn() {
      return this.$store.state.isSignedIn;
    }
  },
  methods: {
    async loadMore(index, done) {
      if (this.isThereMore) {
        const moreRecipes = await getPublishedRecipes(this.recipes.length);

        if (moreRecipes.length === 0) {
          this.isThereMore = false;
        }

        this.recipes.push(...moreRecipes);

        done();
      } else {
        this.$refs.loadMoreEl.stop();
      }
    },
    intoPairs,
    fabScroll(details) {
      this.showFab = details.direction === 'down';
    }
  },
  async created() {
    this.$q.loading.show();

    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user == null) {
        await firebase.auth().signInAnonymously();
      } else {
        (await getPublishedRecipes(this.recipes.length)).forEach(recipe => this.recipes.push(recipe));
        this.$q.loading.hide();
        unsubscribe();
      }
    });
  },
  meta: {
    title: process.env.TITLE,
  },
}
</script>
