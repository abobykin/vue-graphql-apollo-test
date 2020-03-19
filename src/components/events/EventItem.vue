<template>
  <div>
    {{ event.name }} -
    <span class="event-row__date">{{ event.date }}</span>
  </div>
</template>

<script>
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
}
</script>

<style scoped></style>
