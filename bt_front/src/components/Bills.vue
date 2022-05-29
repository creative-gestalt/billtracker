<template>
  <v-container fluid>
    <v-sheet style="margin-top: -0.7em" height="50" outlined>
      <v-row>
        <v-col class="pl-7 mt-3">Bills</v-col>
        <v-col class="pr-7 text-right" style="margin-top: 0.4em">
          <v-btn
            v-if="selected.length > 0"
            class="mr-3"
            color="blue"
            @click="deleteBills"
          >
            Delete Selected
          </v-btn>
          <v-btn
            v-if="selected.length > 0"
            color="red"
            @click="deleteAllOfBill"
          >
            Delete All Months
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="filteredBills"
      :sort-by="['day']"
      :sort-desc="[false]"
      item-key="_id"
      show-select
      hide-default-footer
    >
      <template v-slot:item.amount="{ item }"> ${{ item.amount }}.00 </template>
      <template v-slot:item.paid="{ item }">
        <v-checkbox
          v-model="item.paid"
          @change="updatePaid(item, $event || false)"
        ></v-checkbox>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Bill } from '@/interfaces/monthly-bills.interface';

export default Vue.extend({
  name: 'Bill',
  props: {
    show: Boolean,
  },
  data: () => ({
    headers: [
      { text: 'Title', value: 'name' },
      { text: 'Day', value: 'day' },
      { text: 'Amount', value: 'amount' },
      { text: 'Paid', value: 'paid' },
    ],
    selected: [],
  }),
  methods: {
    updatePaid(bill: Bill, paid: boolean): void {
      this.$store.dispatch('updatePaid', { bill, paid });
    },
    deleteBills(): void {
      this.$store.dispatch('deleteBills', this.selected);
      this.selected = [];
    },
    deleteAllOfBill(): void {
      this.$store.dispatch('deleteAllOfBills', this.selected[0]);
      this.selected = [];
    },
  },
  computed: {
    ...mapGetters(['getBills', 'getSelectedMonth', 'getYear']),
    filteredBills(): Bill[] {
      if (this.getBills.length > 0) {
        const bills = [...this.getBills];
        return bills.filter(
          (bill: Bill) =>
            bill.month === this.getSelectedMonth && bill.year === this.getYear
        );
      }
      return [];
    },
  },
  // watch: {
  //   filteredBills(val): void {
  //     console.log(val);
  //   },
  // },
});
</script>

<style scoped></style>
