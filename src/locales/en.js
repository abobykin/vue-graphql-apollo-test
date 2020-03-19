export default {
  navigation: {
    home: 'Home',
    about: 'About',
    events: 'Events',
  },
  events: {
    title: 'Please add events',
    form: {
      name: 'Event name',
      date: 'Event date',
      errors: {
        name: {
          required: 'Name cannot be empty',
        },
        date: {
          required: 'Date cannot be empty',
        },
      },
    },
    create: 'Create',
  },
  about: {
    title: 'About Apollo',
  },
}
