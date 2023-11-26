<template>
  <div class="submit-form">
    <div>
      <div class="form-group">
        <label for="temperature">Temperature</label>
        <input
          id="temperature"
          type="text"
          class="form-control"
          required
          v-model="reading.temperature"
          name="temperature"
        />
      </div>
      <div class="form-group">
        <label for="moisture">Moisture</label>
        <input
          id="moisture"
          type="text"
          class="form-control"
          required
          v-model="reading.moisture"
          name="moisture"
        />
      </div>
      <div class="form-group">
        <label for="level">Level</label>
        <input
          id="level"
          type="text"
          class="form-control"
          required
          v-model="reading.level"
          name="level"
        />
      </div>
      <button @click="saveReading" class="btn btn-success">Submit</button>
    </div>
  </div>
</template>
<script>
import ReadingDataService from "@/services/ReadingDataService";

export default {
  name: "ReadingAdd",
  data() {
    return {
      reading: {
        id: null,
        temperature: null,
        moisture: null,
        level: null
      },
    };
  },
  methods: {
    saveReading() {
      var data = {
        temperature: this.reading.temperature,
        moisture: this.reading.moisture,
        level: this.reading.level
      };
      ReadingDataService.create(data)
        .then((response) => {
          this.reading.id = response.data.id;
          console.log(response.data);
          this.$notify({
            title: "Success!",
            text: "The Reading was created successfully!",
            type: "success",
          });
          this.$router.push({ name: "reading-list" });
        })
        .catch((e) => {
          e.response.data.errors.forEach((element) => {
            var errorMsg = Object.entries(element)
              .map((x) => x.join(":"))
              .join("\n");
            this.$notify({
              title: "Error!",
              text: errorMsg,
              type: "error",
              time: 5000
            });
          });
          console.log(e);
        });
    },

    newReading() {
      this.reading = {};
    },
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
