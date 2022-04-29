<template>
  <v-card
  elevation="2"
  outlined
  shaped
  class="git-card"
  >
    <slot name="img" />
    <v-card-title class="git-card__title">
      <slot name="title" />
    </v-card-title>
    <v-card-text>
      <slot name="text" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {

}
</script>

<style scoped>
.git-card {
  margin-bottom: 1em;
  text-align: center;
}
.git-card__title {
  justify-content: center;
}
</style>