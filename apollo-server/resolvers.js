import GraphQLJSON from 'graphql-type-json'
import shortid from 'shortid'

export default {
  JSON: GraphQLJSON,

  Query: {
    events: (root, args, { db }) => {
      const events = db.get('events')

      const orderBy = args.orderBy
      const orderByField = orderBy.split('__')

      return events.sortBy(orderByField[0], orderByField[1]).value()
    },
  },

  Mutation: {
    addEvent: (root, { input }, { pubsub, db }) => {
      const event = {
        id: shortid.generate(),
        name: input.name,
        date: input.date,
      };

      db.get('events')
        .push(event)
        .last()
        .write();

      pubsub.publish('eventAdded', { eventAdded: event });

      return event
    },
    removeEvent: (root, { id }, { pubsub, db }) => {
      db.get('events')
        .remove({ id })
        .write();

      pubsub.publish('eventRemoved', { eventRemoved: id });

      return id;
    },
  },

  Subscription: {
    eventAdded: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('eventAdded')
    },
    eventRemoved: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('eventRemoved')
    },
  },
}
