<template>
  <v-app>
    <v-app-bar app color="purple darken-3" dark>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <div>Bills Tracker</div>
        </v-col>
        <v-col cols="2">
          <v-select
            :items="yearSelect"
            :value="getYear"
            @change="setYear"
            hide-details="auto"
            outlined
            dense
          >
            Year
          </v-select>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',
  created(): void {
    this.getBills();
    this.currentYear = new Date().getFullYear().toString();
    this.$store.commit('SET_YEAR', this.currentYear);
    // if (this.$store.getters['getSelectedMonth'] === 0)
    //   this.$store.commit('SET_SELECTED_MONTH', new Date().getMonth() + 1);
  },
  data: () => ({
    currentYear: '',
    selectedYear: '',
    yearSelect: ['2021', '2022', '2023'],
  }),
  methods: {
    ...mapActions(['getBills']),
    setYear(value: string): void {
      this.$store.commit('SET_YEAR', value);
    },
  },
  computed: {
    ...mapGetters(['getYear']),
  },
});
</script>
<style lang="scss">
::-webkit-scrollbar {
  background-color: #202324;
}
::-webkit-scrollbar-thumb {
  background-color: #454a4d;
}
html {
  overflow: auto;
}
</style>
