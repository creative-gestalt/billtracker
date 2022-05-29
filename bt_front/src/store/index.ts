import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { Bill, Complete } from '@/interfaces/monthly-bills.interface';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const url = 'http://192.168.1.250:3000';

interface State {
  bills: Bill[];
  selectedMonth: number;
  completed: Complete[];
  year: string;
}

export default new Vuex.Store({
  state: {
    bills: <Bill[]>[],
    selectedMonth: 0,
    completed: <Complete[]>[],
    year: '',
  },
  mutations: {
    SET_YEAR(state: State, payload: string): void {
      state.year = payload;
    },
    SET_BILLS(state: State, payload: Bill[]): void {
      state.bills = payload;
    },
    SET_SELECTED_MONTH(state: State, payload: number): void {
      state.selectedMonth = payload;
    },
    ADD_BILL(state: State, payload): void {
      state.bills = payload;
    },
    UPDATE_PAID(state: State, payload: Bill[]): void {
      state.bills = payload;
    },
    DELETE_BILLS(state: State, payload: Bill[]): void {
      state.bills = payload;
    },
  },
  actions: {
    async getBills({ commit }): Promise<void> {
      const result = await axios.get(`${url}/getBills`);
      commit('SET_BILLS', result.data);
    },
    async addBill({ commit, state }, payload): Promise<void> {
      const bills = [];
      const stateBills = state.bills;
      if (payload.month === 'All') {
        for (let i = 0; i < 12; i++) {
          const newPayload = Object.assign({}, payload);
          newPayload.month = i + 1;
          bills.push(newPayload);
        }
      } else {
        bills.push(payload);
      }
      const result = await axios.post(`${url}/addBill`, bills);
      result.data.bills.forEach((bill: Bill) => stateBills.push(bill));
      commit('ADD_BILL', stateBills);
    },
    async updatePaid({ commit, state }, payload): Promise<void> {
      let newBill = {};
      const bills = [...state.bills].map((bill) => {
        if (bill._id === `${payload.bill._id}`) {
          bill.paid = <boolean>payload.paid;
          newBill = bill;
        }
        return bill;
      });
      await axios.put(`${url}/updateBill?billID=${payload.bill._id}`, newBill);
      commit('UPDATE_PAID', bills);
    },
    async deleteBills({ commit, state }, payload: Bill[]): Promise<void> {
      let bills = [...state.bills];
      bills = bills.filter((bill: Bill) => !payload.includes(bill));
      await axios.post(`${url}/deleteBills`, payload);
      commit('DELETE_BILLS', bills);
    },
    async deleteAllOfBills({ commit, state }, payload: Bill): Promise<void> {
      const bills = [...state.bills].filter(
        (bill) => bill.reference !== payload.reference
      );
      const toDelete = [...state.bills].filter(
        (bill) => bill.reference === payload.reference
      );
      await axios.post(`${url}/deleteBillFromMonths`, toDelete);
      commit('DELETE_BILLS', bills);
    },
  },
  getters: {
    getYear: (state: State): string => state.year,
    getBills: (state: State): Bill[] => state.bills,
    getSelectedMonth: (state: State): number => state.selectedMonth,
    getCompleted: (state: State): Complete[] => state.completed,
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
