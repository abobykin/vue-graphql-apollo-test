<template>
  <div class="events">
    <create-new-event-form />

    <events-list />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import ADD_EVENT_QUERY from "../graphql/events/AddEvent.gql";
import GET_EVENTS from "../graphql/events/Events.gql";
import EVENT_ADDED_SUBSCRIPTION from "../graphql/events/EventAdded.gql";
import REMOVE_EVENT_QUERY from "../graphql/events/RemoveEvent.gql";
import CreateNewEventForm from "../components/events/CreateNewEventForm";
import EventsList from "../components/events/EventsList";

export default {
  components: { CreateNewEventForm, EventsList },
  mixins: [validationMixin],
  data() {
    return {
      newEvent: {
        name: "",
        date: ""
      },
      queries: {
        ADD_EVENT_QUERY,
        EVENT_ADDED_SUBSCRIPTION,
        GET_EVENTS,
        REMOVE_EVENT_QUERY
      }
    };
  },

  validations: {
    newEvent: {
      name: { required },
      date: { required }
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

    onEventAdded(previousResult, { subscriptionData }) {
      // sorting needs to add new event in the right place
      return {
        events: [
          ...previousResult.events,
          subscriptionData.data.eventAdded
        ].sort((event1, event2) => (event1.date > event2.date ? 1 : -1))
      };
    },

    clearNewEventData() {
      this.newEvent = {
        name: "",
        date: ""
      };
    }
  }
};
</script>
