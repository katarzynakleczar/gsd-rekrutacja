<template>
  <v-col cols="12" lg="4" class="git-column">
      <h1 class="git-column__header">Repos</h1>
      <git-card v-for="(repo, idx) in repos" :key="idx">
        <template v-slot:title> 
            {{repo.name}}
        </template>
        <template v-slot:text>
            <v-row>
                <v-col cols="12">
                    <span class="git-card__label">Opened PR:</span> n/a
                </v-col>
                <v-col cols="12">
                     <span class="git-card__label">Stars:</span> {{repo.watchers_count}}
                </v-col>
                <v-col cols="12">
                     <span class="git-card__label">Opened/Closed issues:</span> {{repo.open_issues}} / n/a
                </v-col>
                <v-col cols="12">
                     <span class="git-card__label">PR to issues:</span> n/a
                </v-col>
                <v-col cols="12">
                     <span class="git-card__label">Last commit:</span> {{formatDate(repo.pushed_at)}}
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
import moment from 'moment'
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
      repos: 'repos/getRepos',
      totalPages: 'repos/getTotalPages'
    })
  },
  methods: {
      ...mapActions({
          nextPage: 'repos/nextPage',
          prevPage: 'repos/prevPage'
      }),
      getDateDifference(d){
        return moment(d).fromNow()
      },
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