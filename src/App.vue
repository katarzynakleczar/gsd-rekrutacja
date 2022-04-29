<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="mr-2">GSD zadanie rekrutacuyjne Katarzyna Klęczar</span>
      </div>
    </v-app-bar>

    <v-main>
      <git-main-view />
    </v-main>
  </v-app>
</template>

<script>
import GitMainView from './components/GitMainView.vue';
import { mapActions } from 'vuex'
export default {
  name: 'App',

  components: {
    GitMainView
  },

  methods: {
    ...mapActions({
      setOrganizations: 'organizations/setOrganizations',
      setUsers: 'users/setUsers',
      setRepos: 'repos/setRepos'
    })
  },

  mounted() {
    this.setOrganizations()
    this.setUsers()
    this.setRepos()
  },

  data: () => ({
    //
  }),
};
</script>
