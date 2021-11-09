<template>
  <div class="p-4">
    <img class="w-[64px] mb-4" src="/logo.svg" alt="">

    <div
      v-if="loading"
      class="spinner-border"
      style="width: 2rem; height: 2rem"
      role="status"
    >
      <div
        class="visually-hidden inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150"
        disabled=""
      >
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading...
      </div>
    </div>
    <table v-else class="table table-hover table-striped">
      <thead>
        <tr class="divide-x divide-gray-400">
          <th>Id</th>
          <th>Дата</th>
          <th>Имя</th>
          <th>Номер ЛК</th>
          <th>Телефон</th>
          <th>Source</th>
          <th>Medium</th>
          <th>Term</th>
          <th>Content</th>
          <th>Campaign</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in itemsSorted"
          :key="index"
          class="divide-x divide-y divide-gray-400"
        >
          <td>{{ itemsSorted.length - index }}</td>
          <td>{{ formatDate(item.id) }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.PersonalNumber }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.utm_source }}</td>
          <td>{{ item.utm_medium }}</td>
          <td>{{ item.utm_term }}</td>
          <td>{{ item.utm_content }}</td>
          <td>{{ item.utm_campaign }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";
import { getDocs, collection } from "firebase/firestore";
import { format } from "date-fns";

export default {
  middleware: ["auth"],
  data: () => ({
    items: [],
    loading: true
  }),
  mounted() {
    this.setInitialize();
  },
  computed: {
    itemsSorted() {
      return this.items?.sort((a, b) => {
        if (a.id > b.id) return -1;
        else if (a.id < b.id) return 1;
        else return 0;
      });
    }
  },
  methods: {
    formatDate(date) {
      return format(new Date(parseInt(date)), "dd.MM.yy (HH:mm)");
    },
    async setInitialize() {
      try {
        this.loading = true;
        const docs = await getDocs(collection(db, "users"));
        docs.forEach(doc => {
          this.items.push({
            id: doc.id,
            ...doc.data()
          });
        });
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
table {
  @apply w-full text-sm border border-gray-400;
}
table td {
  @apply p-1;
}

thead {
  @apply bg-gray-200;
}
thead th {
  @apply text-left font-medium px-1;
}
</style>
