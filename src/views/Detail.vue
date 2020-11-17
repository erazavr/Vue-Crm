<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          "Menu_History" | localize
        }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div :class="record.typeClass" class="card red">
            <div class="card-content white-text">
              <p>{{ "Description" | localize }}: {{ record.description }}</p>
              <p>{{ "Amount" }}: {{ record.amount }}</p>
              <p>
                {{ "Menu_Categories" | localize }}: {{ record.categoryName }}
              </p>

              <small>{{ record.date | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись с id = {{ $route.params.id }} не найдено</p>
  </div>
</template>

<script>
import localizeFilter from "../filters/localize.filter";

export default {
  name: "detail",
  metaInfo() {
    return {
      title: this.$title("Detail_Title"),
    };
  },
  data: () => ({
    loading: true,
    record: null,
  }),
  async mounted() {
    const id = this.$route.params.id;

    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.category
    );

    this.record = {
      ...record,
      categoryName: category.title,
      typeText:
        record.type === "income"
          ? localizeFilter("Income")
          : localizeFilter("Outcome"),
      typeClass: record.type === "income" ? "green" : "red",
    };

    this.loading = false;
  },
};
</script>
