<template>
  <div class="apollo-example">
    <label class="label">{{ $t('home.title') }}</label>

    <ApolloMutation :mutation="queries.ADD_EVENT_QUERY"
                    :variables="{ input: newEvent }"
                    class="form"
                    @done="clearNewEventData()">
      <template slot-scope="{ mutate }">
        <form v-on:submit.prevent="createEvent(mutate)">
          <input v-model="newEvent.name"
                 :placeholder="$t('home.form.name')"
                 class="input">

          <input v-model="newEvent.date"
                 :placeholder="$t('home.form.date')"
                 type="date"
                 class="input">

          <button type="submit">{{ $t('home.create') }}</button>
        </form>
      </template>
    </ApolloMutation>

    <ApolloQuery :query="queries.GET_EVENTS">
      <ApolloSubscribeToMore :document="queries.EVENT_ADDED_SUBSCRIPTION"
                             :update-query="onEventAdded"/>
      <div slot-scope="{ result: { data } }">
        <template v-if="data">
          <div v-for="event of data.events"
               :key="event.id"
               class="message">
            {{ event.name }} - {{ event.date }}
          </div>
        </template>
      </div>
    </ApolloQuery>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import ADD_EVENT_QUERY from '../graphql/events/AddEvent.gql';
import GET_EVENTS from '../graphql/events/Events.gql';
import EVENT_ADDED_SUBSCRIPTION from '../graphql/events/EventAdded.gql';

export default {
  mixins: [ validationMixin ],
  data () {
    return {
      newEvent: {
        name: '',
        date: ''
      },
      queries: { ADD_EVENT_QUERY, EVENT_ADDED_SUBSCRIPTION, GET_EVENTS }
    }
  },

  validations: {
    newEvent: {
      name: { required },
      date: { required },
    }
  },

  methods: {
    createEvent($mutation) {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      $mutation();
    },

    onEventAdded (previousResult, { subscriptionData }) {
      // sorting needs to add new event in the right place
      return {
        events: [
          ...previousResult.events,
          subscriptionData.data.eventAdded,
        ].sort((event1, event2) => event1.date > event2.date ? 1 : -1),
      }
    },

    clearNewEventData() {
      this.newEvent = {
        name: '',
        date: ''
      }
    }
  },
}
</script>
