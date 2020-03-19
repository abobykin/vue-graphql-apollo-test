<template>
  <div class="form-row">
    <label :for="inputId" class="form-label">{{ title }}</label>
    <input
      :id="inputId"
      :value="value"
      :class="{ filled: value }"
      :type="type"
      minlength="4"
      class="form-control"
      @input="input"
    />

    <transition name="fade">
      <div v-if="errors.$error" class="form-errors-list">
        <span
          v-for="(message, key) in errorMessages"
          v-show="errors[key] === false"
          v-html="message"
          :key="key"
          class="form-error"
        ></span>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'UiKitInput',
  props: {
    id: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    errors: {
      type: Object | null,
      default: () => ({}),
    },
    errorMessages: {
      type: Object | null,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'text',
    },
    exceptCharacters: {
      type: RegExp,
      required: false,
    },
  },
  data: () => ({
    /**
     * Generate unique string to bind input with label
     *
     * @return string
     **/
    inputId: null,
  }),
  mounted() {
    this.inputId = this.id
      ? this.id
      : '_' +
        Math.random()
          .toString(36)
          .substr(2, 9)
  },
  methods: {
    input($event) {
      let value = $event.target.value

      if (this.exceptCharacters) {
        value = value.replace(this.exceptCharacters, '')

        $event.target.value = value
      }

      this.$emit('input', value)
    },
  },
}
</script>

<style scoped></style>
