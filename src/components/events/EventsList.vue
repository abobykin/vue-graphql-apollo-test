<template>
  <ApolloQuery :query="queries.GET_EVENTS" ref="apolloQuery">
    <ApolloSubscribeToMore
      :document="queries.EVENT_ADDED_SUBSCRIPTION"
      :update-query="onEventAdded"
    />
    <ApolloSubscribeToMore
      :document="queries.EVENT_REMOVED_SUBSCRIPTION"
      :update-query="onEventRemoved"
    />
    <div slot-scope="{ result: { data } }">
      <template v-if="data">
        <transition-group name="list" tag="p">
          <div v-for="event of data.events" :key="event.id" class="event-row">
            <event-item :event="event" />
          </div>
        </transition-group>
      </template>
    </div>
  </ApolloQuery>
</template>

<script>
import EventItem from './EventItem'
import EVENT_ADDED_SUBSCRIPTION from '../../graphql/events/EventAdded.gql'
import EVENT_REMOVED_SUBSCRIPTION from '../../graphql/events/EventRemoved.gql'
import GET_EVENTS from '../../graphql/events/Events.gql'

export default {
  name: 'EventsList',
  components: { EventItem },
  data: () => ({
    queries: { GET_EVENTS, EVENT_ADDED_SUBSCRIPTION, EVENT_REMOVED_SUBSCRIPTION },
  }),

  methods: {
    onEventAdded(previousResult, { subscriptionData }) {
      // sorting needs to add new event in the right place
      return {
        events: [
          ...previousResult.events,
          subscriptionData.data.eventAdded,
        ].sort((event1, event2) => (event1.date > event2.date ? 1 : -1)),
      }
    },
    onEventRemoved(previousResult, { subscriptionData }) {
      previousResult.events.splice(this.eventsIndex[subscriptionData.data.eventRemoved.id], 1)

      return {
        events: previousResult.events
      }
    },
  },

  computed: {
    eventsIndex() {
      return this.$refs.apolloQuery.result.data.events.reduce((map, item, index) => {
        map[item.id] = index;

        return map;
      }, {});

    }
  }
}
</script>

<style scoped></style>
