<template>
  <div class="list row">
    <div>
      <h4>Reading List</h4>

    </div>
  </div>
</template>


<script>
import ReadingDataService from "@/services/ReadingDataService";

export default {
  name: "ReadingList",
  data() {
    return {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    fetchTasks() {
      ReadingDataService.getAll()
        .then((response) => {
          this.tasks = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.fetchTasks();
      this.currentTask = null;
      this.currentIndex = -1;
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
    this.fetchTasks();
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
