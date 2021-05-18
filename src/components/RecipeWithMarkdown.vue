<template>
  <div class="col-md-6 justify-md-center q-mx-auto">
    <q-img
      v-if="recipe.show_image"
      :src="recipe.image_url"
      class="block q-mx-auto"
      style="max-width: 80%;"
    />

    <h3 class="q-pa-md">{{ recipe.title }}</h3>


    <q-markdown :src="recipe.markdown"></q-markdown>

    <div id="contributions" class="q-mt-lg">
      <div>
        <p>Written By: <strong>{{ recipe.written_by }}</strong></p>
      </div>
    </div>

    <h3 class="q-mt-none">Recipe tags</h3>

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
</template>

<script>
import { mapState } from 'vuex';
import { date } from 'quasar';
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';

export default {
  name: 'RecipeWithMarkdown',
  components: {
    QMarkdown
  },
  computed: {
    ...mapState({
      recipe: state => state.recipes.current
    }),
  },
  methods: {
    formatDate: date.formatDate,
  },
}
</script>
