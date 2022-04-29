<template>
  <v-container>
      <v-row>
          <git-organizations-column />
          <git-users-column />
          <git-repos-column />
      </v-row>
  </v-container>
</template>

<script>
import GitOrganizationsColumn from '@/components/GitOrganizationsColumn.vue'
import GitUsersColumn from '@/components/GitUsersColumn.vue'
import GitReposColumn from './GitReposColumn.vue'
export default {
  components: {GitOrganizationsColumn, GitUsersColumn, GitReposColumn}
}
</script>

<style>

</style>