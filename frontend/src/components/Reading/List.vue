<template>
  <div class="list row">
    <div>
      <h4>Reading List</h4>
      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature</th>
            <th>Moisture</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reading in readings">
            <td>{{ reading.createdAt }}</td>
            <td>{{ reading.temperature }}</td>
            <td>{{ reading.moisture }}</td>
            <td>{{ reading.level }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import ReadingDataService from "@/services/ReadingDataService";

export default {
  name: "ReadingList",
  data() {
    return {
      readings: [],
    };
  },
  methods: {
    fetchReadings() {
      ReadingDataService.getAll()
        .then((response) => {
          this.readings = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    refreshList() {
      this.fetchReadings();
    },
    getDate(datetime) {
      let date = new Date(datetime);

      let dateString = `${date.getFullYear}/${date.getMonth() + 1}/${
        date.getDate
      }`;

      return date;
    },
  },
  mounted() {
    this.fetchReadings();
  },
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
