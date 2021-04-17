<template>
  <q-page padding>
    <div class="row">
      <div v-if="recipe" class="col-md-6 justify-md-center q-mx-auto">
        <q-img
          :src="recipe.image_url"
          class="block q-mx-auto"
          style="max-width: 80%;"
        />

        <h3 class="q-pa-md">{{ recipe.title }}</h3>

        <q-list bordered>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="av_timer"/>
            </q-item-section>

            <q-item-section>
              <strong>Prep time:</strong> {{ formatTime(recipe.prep_time) }}
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="secondary" name="outdoor_grill"/>
            </q-item-section>

            <q-item-section>
              <strong>Cook time:</strong> {{ formatTime(recipe.cook_time) }}
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="info" name="dinner_dining"/>
            </q-item-section>

            <q-item-section>
              <strong>Servings:</strong> {{ recipe.servings }}
            </q-item-section>
          </q-item>
        </q-list>

        <h3>Ingredients</h3>

        <div id="ingredients">
          <q-btn @click="switchIngredientsCheckValue()" icon-right="done_all" label="Check All" color="primary"/>
          <br>
          <br>
          <q-list bordered>
            <q-item
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
              tag="label"
              @click.prevent="switchIngredientCheckValue(index)"
              v-ripple
            >
              <q-item-section
                :class="{checked: ingredient.checked}"
              >{{ capitalizeInitial(ingredient.text) }}</q-item-section>
              <q-item-section avatar>
                <q-checkbox
                  :value="ingredient.checked"
                  @input="switchIngredientCheckValue(index)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <h3>Directions</h3>

        <div id="directions" class="text-h6">
          <div v-for="(direction, index) in recipe.directions" :key="index">
            <q-card>
              <q-card-section>
                {{ index + 1 }}. {{ capitalizeInitial(direction) }}
              </q-card-section>
            </q-card>
            <br>
          </div>
        </div>

        <h3>Contribution</h3>

        <div id="contributions">
          <div>
            <h6>Written By: <strong>{{ recipe.written_by }}</strong></h6>

            <div class="row">
              <div class="q-mx-auto">
                <q-btn
                  v-if="recipe.donation_url"
                  class="text-h6 q-mb-md"
                  :href="recipe.donation_url"
                  rounded
                  type="a"
                  icon="volunteer_activism"
                  text-color="indigo-9"
                  target="_blank"
                  label="Donate"
                />
              </div>
            </div>
          </div>

          <div>
            <h6
              v-if="recipe.eth"
              class="q-mt-none"
            >
              <strong>Eth: </strong> <code>{{ recipe.eth }}</code>
            </h6>
          </div>
        </div>

        <h3>Recipe tags</h3>
        <q-btn-group
          push
          style="flex-wrap: wrap !important;"
        >
          <q-btn
            v-for="(tag, index) in recipe.tags"
            :key="index"
            :label="tag"
          />
        </q-btn-group>

        <br>
        <br>
        <hr>
        <br>

        <p class="text-h6">Recipe posted on:
          <q-badge
            v-if="recipe.created_at"
            class="text-h6"
          >{{ formatDate(recipe.created_at.toDate(), 'YYYY-MM-DD hh:mm:ss A') }}</q-badge>
        </p>

      </div>
    </div>
  </q-page>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {getRecipeBySlug, formatTime} from 'src/helpers/recipes';
import {date, format} from 'quasar';

export default {
  name: 'Recipe',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      recipe: state => state.recipes.current
    }),
  },
  methods: {
    ...mapActions({
      setCurrentRecipe: 'recipes/setCurrent',
      switchIngredientsCheckValue: 'recipes/switchIngredientsCheckValue',
      switchIngredientCheckValue: 'recipes/switchIngredientCheckValue',
    }),
    formatTime,
    formatDate: date.formatDate,
    capitalizeInitial: format.capitalize,
  },
  async created() {
    this.$q.loading.show();
    const recipeSlug = this.$route.params.slug;
    const recipe = await getRecipeBySlug(recipeSlug);

    if (recipe === null || ! recipe.is_published) {
      this.$q.loading.hide();
      await this.$router.push({ name: 'not_found' });
      return;
    }

    this.setCurrentRecipe(recipe);
    this.$q.loading.hide();
  },
  meta() {
    return {
      title: (this.recipe.title ?? '') + ' - ' + process.env.TITLE,
    };
  },
}
</script>

<style lang="scss">
.checked {
  text-decoration: line-through;
  color: grey;
}
</style>
