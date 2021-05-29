<template>
  <q-page padding>
    <div class="row">
      <template v-if="recipe">
        <template v-if="'markdown' in recipe">
          <recipe-with-markdown />
        </template>
        <template v-else>
          <recipe-component />
        </template>
      </template>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getRecipeBySlug } from 'src/helpers/recipes';
import Recipe from 'src/components/Recipe';
import RecipeWithMarkdown from 'src/components/RecipeWithMarkdown';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Recipe',
  components: {
    'recipe-component': Recipe,
    'recipe-with-markdown': RecipeWithMarkdown,
  },
  computed: {
    ...mapState({
      recipe: state => state.recipes.current
    }),
  },
  methods: {
    ...mapActions({
      setCurrentRecipe: 'recipes/setCurrent',
    }),
  },
  async created() {
    this.$q.loading.show();
    const recipeSlug = this.$route.params.slug;

    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user != null) {
        const recipe = await getRecipeBySlug(recipeSlug);

        if (recipe === null || ! recipe.is_published) {
          this.$q.loading.hide();
          await this.$router.push({ name: 'not_found' });
          unsubscribe();
          return;
        }

        this.setCurrentRecipe(recipe);

        this.$q.loading.hide();
        
        unsubscribe();
      }
    });
  },
  meta() {
    return {
      title: (this.recipe.title ?? '') + ' - ' + process.env.TITLE,
    };
  },
}
</script>
