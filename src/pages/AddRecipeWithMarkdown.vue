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
            <div class="col-12 col-lg-8 q-mb-md">
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
            <div class="col-12 col-lg-8 q-mb-md">
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
            <div class="q-gutter-sm">
              <q-checkbox v-model="show_image" label="Show image at the beginning of the recipe?" />
            </div>
          </div>

          <div class="tags q-mb-xl">
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
            <div class="col-12 col-md-6 q-pa-md">
              <q-input
                v-model="markdown"
                outlined
                hint="Type your markdown here"
                autogrow
                lazy-rules
                :rules="[val => !!val || 'Field is required!']"
              />
            </div>

            <div class="col-12 col-md-6 q-pa-md">
              <q-markdown :src="markdown"></q-markdown>
            </div>
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

        </q-form>

      </div>
    </div>
  </q-page>
</template>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';
import { storeRecipe } from 'src/helpers/recipes';

export default {
  name: 'AddRecipeWithMarkdown',
  components: {
    QMarkdown
  },
  data() {
    return {
      title: null,
      markdown: null,
      slug: '',
      image_url: null,
      show_image: true,
      tags: [
        {
          id: 0,
          text: '',
        }
      ],
      isSubmitting: false,
    }
  },
  computed: {
    userName() {
      return this.$store.state.signedUser;
    }
  },
  methods: {
    storeRecipe,
    async onSubmit() {
      this.isSubmitting = true;

      const recipe = {};

      recipe.tags = this.tags.filter(tag => tag.text.trim().length > 0)
        .map(tag => tag.text.trim().toLowerCase());

      if (recipe.tags.length === 0) {
        return this.handleError('Tags are blank!');
      }

      recipe.title = this.title.trim();

      recipe.slug = this.slug.length > 0 ?
        this.slug :
        this.title.trim().toLowerCase().replaceAll(' ', '-');

      recipe.image_url = this.image_url.trim();
      recipe.show_image = this.show_image;

      recipe.written_by = this.userName;

      recipe.created_at = new Date();

      recipe.is_published = false;

      recipe.markdown = this.markdown;

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
      this.title = null;
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

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>
