<template>
  <ApolloMutation
    :mutation="queries.ADD_EVENT_QUERY"
    :variables="{ input: newEvent }"
    @done="clearNewEventData()"
  >
    <template slot-scope="{ mutate }">
      <h1 class="page-heading">{{ $t('events.title') }}</h1>

      <form v-on:submit.prevent="createEvent(mutate)" class="form">
        <div class="form-group">
          <ui-kit-input
            v-model="newEvent.name"
            :title="$t('events.form.name')"
            :errors="$v.newEvent.name"
            :error-messages="$t('events.form.errors.name')"
          />

          <ui-kit-input
            v-model="newEvent.date"
            :title="$t('events.form.date')"
            :errors="$v.newEvent.date"
            :error-messages="$t('events.form.errors.date')"
            type="date"
          />
          <button type="submit">
            {{ $t('events.create') }}
          </button>
        </div>
      </form>
    </template>
  </ApolloMutation>
</template>

<script>
import UiKitInput from '../ui-kit/UiKitInput'
import ADD_EVENT_QUERY from '../../graphql/events/AddEvent.gql'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CreateNewEventForm',
  components: { UiKitInput },
  mixins: [validationMixin],
  data() {
    return {
      newEvent: {
        name: '',
        date: '',
      },
      queries: { ADD_EVENT_QUERY },
    }
  },

  validations: {
    newEvent: {
      name: { required },
      date: { required },
    },
  },

  methods: {
    createEvent($mutation) {
      this.$v.$touch()

      if (this.$v.$error) {
        return
      }

      $mutation()

      this.$v.$reset()
    },

    clearNewEventData() {
      this.newEvent = {
        name: '',
        date: '',
      }
    },
  },
}
</script>

<style scoped></style>
