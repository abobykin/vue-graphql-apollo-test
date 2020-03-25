<template>
  <div>
    {{ event.name }} -
    <span class="event-row__date">{{ event.date }} {{ event.id }}</span>
    <ApolloMutation
      :mutation="queries.REMOVE_EVENT_QUERY"
      :variables="{ id: event.id }"
    >
      <template slot-scope="{ mutate }">
        <span v-on:click="deleteEvent(mutate)" class="event-row__remove-button">
          <IconRemove />
        </span>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import IconRemove from '../icons/IconRemove'
import REMOVE_EVENT_QUERY from '../../graphql/events/RemoveEvent.gql'

export default {
  name: 'EventItem',
  props: {
    event: {
      type: Object,
      default: () => ({
        name: '',
        date: '',
      }),
    },
  },
  data() {
    return {
      queries: { REMOVE_EVENT_QUERY },
    }
  },
  methods: {
    deleteEvent($mutation) {
      $mutation()
    },
  },
  components: {
    IconRemove,
  },
}
</script>

<style scoped></style>
