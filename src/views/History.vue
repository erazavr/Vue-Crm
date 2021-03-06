<template>
  <div>
    <div class="page-title">
      <h3>{{ "Records_History" | localize }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{ "NoRecords" | localize }}.
      <router-link to="/record"
        >{{ "AddNewRecordLink" | localize }}.</router-link
      >
    </p>

    <section v-else>
      <HistoryTable :records="items" :page="page" :page-size="pageSize" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable";
import localizeFilter from "../filters/localize.filter";
import { Pie } from "vue-chartjs";

export default {
  name: "history",
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  watch: {
    $route(to, from) {
      if (!to.query.page) {
        this.pageChangeHandler(1);
        this.page = 1;
      }
    },
  },
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    if (this.records.length) {
      this.setUp(categories);
    }
    this.loading = false;
  },
  methods: {
    setUp(categories) {
      this.setupPagination(
        this.records.map((record, index) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.category)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText:
              record.type === "income"
                ? localizeFilter("Income")
                : localizeFilter("Outcome"),
            number: index + 1,
          };
        })
      );
      this.renderChart({
        labels: categories.map((c) => c.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map((c) => {
              return this.records.reduce((total, r) => {
                if (r.category === c.id && r.type === "outcome") {
                  total += +r.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    },
  },
  components: {
    HistoryTable,
  },
};
</script>
