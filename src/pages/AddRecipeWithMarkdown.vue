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
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AddRecipeWithMarkdown',
  data() {
    return {
      title: null,
    }
  },
  methods: {
    onSubmit() {
      const recipe = {
        title: this.title
      };

    },
    onReset() {
      this.title = null;
    }
  },
}
</script>
