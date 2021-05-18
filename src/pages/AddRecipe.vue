<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <h3 class="text-center">Add A New Recipe!</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-12 q-px-lg">
        <q-form
          @submit.prevent.stop="onSubmit"
          @reset="onReset"
          class="my-form"
        >
          <div class="row">
            <div class="col-12 col-lg-8">
              <q-input
                outlined
                v-model="title"
                label="Title"
                autofocus
                autogrow
                :rules="[val => !!val || 'Field is required!']"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-8">
              <q-input outlined v-model="slug" label="Slug (optional)" autogrow />
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-8">
              <q-input
                outlined
                v-model="image_url"
                label="Image url"
                autogrow
                :rules="[val => !!val || 'Field is required!']"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4 q-px-md">
              <div class="row">
                <h6 class="q-mx-auto q-my-none">Prep Time</h6>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                    outlined
                    v-model="prep_time.hours"
                    label="Hours"
                    type="number"
                    min="0"
                    step="1"
                    :rules="[val => val < 24 || 'Field cannot be bigger than 24!']"
                  />
                </div>
                <div class="col">
                  <q-input
                    outlined
                    v-model="prep_time.minutes"
                    label="Minutes"
                    type="number"
                    min="0"
                    step="1"
                    :rules="[val => val < 60 || 'Field cannot be bigger than 59!']"
                  />
                </div>
              </div>
            </div>

            <div class="col-sm-4 q-px-md">
              <div class="row">
                <h6 class="q-mx-auto q-my-none">Cook Time</h6>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                    outlined
                    v-model="cook_time.hours"
                    label="Hours"
                    type="number"
                    min="0"
                    step="1"
                    :rules="[val => val < 24 || 'Field cannot be bigger than 24!']"
                  />
                </div>
                <div class="col">
                  <q-input
                    outlined
                    v-model="cook_time.minutes"
                    label="Minutes"
                    type="number"
                    min="0"
                    step="1"
                    :rules="[val => val < 60 || 'Field cannot be bigger than 59!']"
                  />
                </div>
              </div>
            </div>

            <div class="col-sm-4 q-px-md">
              <div class="row">
                <h6 class="q-mx-auto q-my-none">Servings</h6>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                    outlined
                    v-model="servings"
                    label="Servings"
                    type="number"
                    step="1"
                    min="1"
                    :rules="[val => val > 0 || 'Field must be bigger than 0!']"
                  />
                </div>
              </div>
            </div>

          </div>

          <div class="ingredients">
            <h6 class="q-mb-none">Ingredients</h6>
            <transition-group
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <div v-for="(ingredient, index) in ingredients" :key="ingredient.id" class="row q-mb-sm">
                <div class="col-10 col-lg-8">
                  <q-input
                    outlined
                    v-model="ingredient.text"
                    autogrow
                    :ref="'ingredient-' + index"
                    @keypress.enter.prevent="addIngredient(index)"
                  />
                </div>
                <div class="col-2">
                  <q-btn
                    @click="removeIngredient(index)"
                    icon="remove"
                    round
                    color="negative"
                    class="q-mt-sm q-ml-md"
                  />
                </div>
              </div>
            </transition-group>
            <div class="row">
              <q-btn @click="addIngredient(ingredients.length - 1)" class="q-mt-md" icon="add" round />
            </div>
          </div>

          <div class="directions">
            <h6 class="q-mb-none">Directions</h6>
            <transition-group
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <div v-for="(direction, index) in directions" :key="direction.id" class="row q-mb-sm">
                <div class="col-10 col-lg-8">
                  <q-input
                    outlined
                    v-model="direction.text"
                    autogrow
                    :ref="'direction-' + index"
                    @keypress.prevent.enter="addDirection(index)"
                  />
                </div>
                <div class="col-2">
                  <q-btn
                    @click="removeDirection(index)"
                    icon="remove"
                    round
                    color="negative"
                    class="q-mt-sm q-ml-md"
                  />
                </div>
              </div>
            </transition-group>
            <div class="row">
              <q-btn @click="addDirection(directions.length - 1)" class="q-mt-md" icon="add" round />
            </div>
          </div>

          <br>
          <br>

          <div class="row">
            <div class="col-12 col-lg-8">
              <q-input
                outlined
                v-model="written_by"
                label="Your Name"
                autogrow
                :rules="[val => !!val || 'This field is required!']"
              />
            </div>
          </div>

          <br>

          <div class="row">
            <div class="col-12 col-lg-8">
              <q-input
                outlined
                v-model="donation_url"
                label="Donation Url"
                autogrow
              />
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-8">
              <q-input
                outlined
                v-model="eth"
                label="Eth public key"
              />
            </div>
          </div>

          <div class="tags">
            <h6 class="q-mb-none">Tags</h6>
            <transition-group
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <div v-for="(tag, index) in tags" :key="tag.id" class="row q-mb-sm">
                <div class="col-10 col-lg-8">
                  <q-input
                    outlined
                    v-model="tag.text"
                    autogrow
                    :ref="'tag-' + index"
                    @keypress.prevent.enter="addTag(index)"
                  />
                </div>
                <div class="col-2">
                  <q-btn
                    @click="removeTag(index)"
                    icon="remove"
                    round
                    color="negative"
                    class="q-mt-sm q-ml-md"
                  />
                </div>
              </div>
            </transition-group>
            <div class="row">
              <q-btn @click="addTag(tags.length - 1)" class="q-mt-md" icon="add" round />
            </div>
          </div>

          <div class="row">
            <div class="q-mx-auto q-mt-lg">
              <div>
                <vue-recaptcha
                  :sitekey="recaptchaSiteKey"
                  :loadRecaptchaScript="true"
                  @verify="response => { this.isBot = false }"
                  @expired="() => { this.isBot = true }"
                  ref="recaptcha"
                ></vue-recaptcha>
              </div>

              <div class="flex q-mt-lg">
                <q-btn
                  type="submit"
                  icon="add_circle"
                  label="Add"
                  color="primary"
                  class="q-mx-auto"
                  :loading="isSubmitting"
                />
              </div>
            </div>
          </div>
        </q-form>

      </div>
    </div>
  </q-page>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import { storeRecipe } from 'src/helpers/recipes';

export default {
  name: 'AddRecipe',
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      isSubmitting: false,
      isBot: null,
      howManyRecipesBeenSubmitted: 0,
      title: '',
      slug: '',
      image_url: '',
      prep_time: {
        hours: 0,
        minutes: 0,
      },
      cook_time: {
        hours: 0,
        minutes: 0,
      },
      servings: 1,
      ingredients: [
        {
          id: 0,
          text: '',
        }
      ],
      directions: [
        {
          id: 0,
          text: '',
        }
      ],
      written_by: '',
      donation_url: '',
      eth: '',
      tags: [
        {
          id: 0,
          text: '',
        }
      ]
    }
  },
  computed: {
    recaptchaSiteKey() {
      return process.env.RECAPTCHA_SITE_KEY;
    }
  },
  methods: {
    addIngredient(index = null) {
      this.ingredients.push({id: this.ingredients[this.ingredients.length - 1].id + 1, text: ''});

      if (index !== null) {
        this.$nextTick(() => {
          this.$refs['ingredient-' + (index + 1)][0].focus();
        });
      }
    },
    removeIngredient(index) {
      if (this.ingredients.length > 1) {
        this.ingredients.splice(index, 1);
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'At least one ingredient 🥺'
        })
      }
    },
    addDirection(index = null) {
      this.directions.push({id: this.directions[this.directions.length - 1].id + 1, text: ''});

      if (index !== null) {
        this.$nextTick(() => {
          this.$refs['direction-' + (index + 1)][0].focus();
        });
      }
    },
    removeDirection(index) {
      if (this.directions.length > 1) {
        this.directions.splice(index, 1);
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'At least one direction 🥺'
        })
      }
    },
    addTag(index = null) {
      this.tags.push({id: this.tags[this.tags.length - 1].id + 1, text: ''});

      if (index !== null) {
        this.$nextTick(() => {
          this.$refs['tag-' + (index + 1)][0].focus();
        });
      }
    },
    removeTag(index) {
      if (this.tags.length > 1) {
        this.tags.splice(index, 1);
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'At least one tag 🥺👉👈',
        })
      }
    },
    storeRecipe,
    async onSubmit() {
      this.isSubmitting = true;

      const recipe = {};

      recipe.title = this.title.trim();

      recipe.slug = this.slug.length > 0 ?
        this.slug :
        this.title.trim().toLowerCase().replaceAll(' ', '-');

      recipe.image_url = this.image_url.trim();

      recipe.prep_time = this.prep_time.hours + (this.prep_time.minutes / 100);

      recipe.cook_time = this.cook_time.hours + (this.cook_time.minutes / 100);

      recipe.servings = this.servings;

      recipe.ingredients = this.ingredients.filter(ingredient => ingredient.text.trim().length > 0)
        .map(ingredient => ingredient.text.trim());

      recipe.directions = this.directions.filter(direction => direction.text.trim().length > 0)
        .map(direction => direction.text.trim());

      recipe.written_by = this.written_by.trim();

      if (this.donation_url) {
        recipe.donation_url = this.donation_url.trim();
      }

      if (this.eth) {
        recipe.eth = this.eth.trim();
      }

      recipe.tags = this.tags.filter(tag => tag.text.trim().length > 0)
        .map(tag => tag.text.trim().toLowerCase());

      recipe.created_at = new Date();

      recipe.is_published = false;

      if (recipe.ingredients.length === 0) {
        return this.handleError('Ingredients are blank!');
      }

      if (recipe.directions.length === 0) {
        return this.handleError('Directions are blank!');
      }

      if (recipe.tags.length === 0) {
        return this.handleError('Tags are blank!');
      }

      if (this.isBot === null || this.isBot) {
        return this.handleError('Are you a bot? 🤖');
      }

      this.howManyRecipesBeenSubmitted++;

      if (this.howManyRecipesBeenSubmitted >= 6) {
        this.howManyRecipesBeenSubmitted = 0;

        this.isBot = true;

        this.$refs.recaptcha.reset();

        return this.handleError('Are you sure you are not a bot? 🤖🤖🤖');
      }

      const docRef = await this.storeRecipe(recipe);

      if (docRef !== null) {
        this.$q.notify({
          message: 'Your recipe has been added and will be reviewed!',
          icon: 'celebration',
          position: 'center',
          color: 'positive',
        });
      }

      this.isSubmitting = false;
    },
    onReset() {
      // TODO
    },
    handleError(errorMessage) {
      this.isSubmitting = false;

      this.$q.notify({
        color: 'negative',
        message: errorMessage,
      });

      return null;
    },
  },
  meta: {
    title: 'New Recipe' + ' - ' + process.env.TITLE,
  },
}
</script>
<style lang="scss">
.my-form>.row {
  margin-bottom: 8px;
}
</style>
