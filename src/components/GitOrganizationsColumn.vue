<template>
  <v-col cols="12" lg="4" class="git-column">
      <h1 class="git-column__header">Organizations</h1>
      <git-card v-for="(org, idx) in organizations" :key="idx">
        <template v-slot:title> 
            {{org.name ? org.name : org.login}}
        </template>
        <template v-slot:text>
            <v-row>
                <v-col cols="12">
                    <span class="git-card__label">Users:</span> {{org.members_count}}
                </v-col>
                <v-col cols="12">
                     <span class="git-card__label">Respos:</span> {{org.public_repos}}
                </v-col>
                <v-col cols="12">
                     <span class="git-card__label">Created:</span> {{formatDate(org.created_at)}}
                </v-col>
            </v-row>
        </template>
      </git-card>
      <v-pagination 
      :length="totalPages"
      v-model="page"
      total-visible="0"
      circle
      @next="nextPage()"
      @prev="prevPage()"
      >
      </v-pagination>
  </v-col>
</template>

<script>
import GitCard from '@/components/containers/GitCard.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  components: {GitCard},
  data() {
      return {
        since: 0,
        page: 1,
      }
  },
  computed: {
    ...mapGetters({
      organizations: 'organizations/getOrganizations',
      totalPages: 'organizations/getTotalPages'
    })
  },
  methods: {
      ...mapActions({
          nextPage: 'organizations/nextPage',
          prevPage: 'organizations/prevPage'
      }),
      formatDate(d){
          const date = new Date(d)
          return date.toLocaleString()
      }
  }
}
</script>

<style scoped>
.git-column__header{
    text-align: center;
}
.git-card__label{
    font-weight: bold;
}
</style>