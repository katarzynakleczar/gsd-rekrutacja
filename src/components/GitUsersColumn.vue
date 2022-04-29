<template>
  <v-col cols="12" lg="4" class="git-column">
      <h1 class="git-column__header">Users</h1>
      <git-card v-for="(user, idx) in users" :key="idx">
        <template v-slot:img>
          <v-img
            height="300"
            :src="user.avatar_url"
          ></v-img>
        </template>
        <template v-slot:title> 
            {{user.name}} "{{user.login}}"
        </template>
        <template v-slot:text>
            <v-row>
                <v-col cols="12">
                     <span class="git-card__label">Registered:</span> {{ getDateDifference(user.created_at)}}
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
      users: 'users/getUsers',
      totalPages: 'users/getTotalPages'
    })
  },
  methods: {
      ...mapActions({
          nextPage: 'users/nextPage',
          prevPage: 'users/prevPage'
      }),
      getDateDifference(d){
        return moment(d).fromNow()
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