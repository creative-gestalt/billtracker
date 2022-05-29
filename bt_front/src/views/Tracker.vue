<template>
  <v-container fluid>
    <v-sheet class="pa-2 mb-4" outlined>
      <v-row align="center" justify="center">
        <v-col class="ma-auto text-center"> New Bill </v-col>
        <v-col>
          <v-select
            :items="monthSelect"
            value="All"
            label="Month"
            @change="setMonth"
            hide-details="auto"
            outlined
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="name"
            placeholder="Title"
            hide-details="auto"
            persistent-placeholder
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="day"
            placeholder="Day"
            hide-details="auto"
            persistent-placeholder
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="amount"
            prepend-icon="mdi-currency-usd"
            placeholder="Amount"
            hide-details="auto"
            persistent-placeholder
            dense
          ></v-text-field>
        </v-col>
        <v-col class="ma-auto text-center">
          <v-checkbox
            v-model="paid"
            label="Paid"
            hide-details="auto"
            dense
          ></v-checkbox>
        </v-col>
        <v-col class="ma-auto text-center"
          ><v-select
            :items="yearSelect"
            :value="year"
            label="Year"
            @change="setYear"
            hide-details="auto"
            outlined
            dense
          ></v-select>
        </v-col>
        <v-col class="ma-auto text-center">
          <v-btn @click="addBill">Submit</v-btn>
        </v-col>
      </v-row>
    </v-sheet>
    <v-row no-gutters>
      <v-col cols="2">
        <v-navigation-drawer color="grey darken-4" permanent>
          <v-list-item>
            <v-list-item-content>Months</v-list-item-content>
          </v-list-item>
          <v-divider> </v-divider>
          <v-list dense>
            <v-list-item
              v-for="(month, i) in months"
              :key="month"
              :to="`/${i + 1}`"
              @click="setSelectedMonth(i)"
              link
            >
              <v-list-item-content>{{ month }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="10">
        <router-view name="bills"></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Tracker',
  created(): void {
    this.year = this.getYear;
  },
  data: () => ({
    page: 1,
    sorting: [false, false],
    itemsPerPage: 12,
    selectedMonth: new Date().getMonth() + 1,
    month: null as unknown,
    day: '',
    name: '',
    amount: '',
    paid: null,
    year: '',
    yearSelect: ['2021', '2022', '2023'],
    monthSelect: [
      'All',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    done: false,
    dialog: false,
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  }),
  methods: {
    addBill(): void {
      const newBill = {
        month: this.month || 'All',
        day: this.day,
        name: this.name,
        amount: this.amount,
        paid: this.paid || false,
        reference: uuidv4(),
        year: this.year,
      };
      this.month = '';
      this.day = '';
      this.name = '';
      this.amount = '';
      this.paid = null;
      this.year = '';
      this.$store.dispatch('addBill', newBill);
    },
    setYear(value: string): void {
      this.year = value;
    },
    setMonth(value: string): void {
      if (value === 'All') this.month = value;
      if (value !== 'All') this.month = this.months.indexOf(value) + 1;
    },
    setSelectedMonth(index: number): void {
      this.selectedMonth = index + 1;
      this.$store.commit('SET_SELECTED_MONTH', index + 1);
    },
  },
  computed: {
    ...mapGetters(['getSelectedMonth', 'getYear']),
    compSelectedMonth(): number {
      return this.selectedMonth;
    },
  },
});
</script>
