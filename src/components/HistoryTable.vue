<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ "Amount" | localize }}</th>
        <th>{{ "Date" | localize }}</th>
        <th>{{ "Menu_Categories" | localize }}</th>
        <th>{{ "Type" | localize }}</th>
        <th>{{ "Open" | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="r of records" :key="r.id">
        <td>{{ r.number }}</td>
        <td>{{ r.amount | currency }}</td>
        <td>{{ r.date | date("date") }}</td>
        <td>{{ r.categoryName }}</td>
        <td>
          <span :class="[r.typeClass]" class="white-text badge">{{
            r.typeText
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Open_Record'"
            class="btn-small btn"
            @click="$router.push('/detail/' + r.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
};
</script>
