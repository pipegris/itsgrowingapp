<template>
  <div class="row">
    <Line
      class="col-12"
      id="my-chart-id"
      v-if="dataLoaded"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
  <div class="row">
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Temperature (°C)</th>
          <th>Moisture (%)</th>
          <th>Level (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reading in readingsTable">
          <td> {{ reading.id }}</td>
          <td>{{ reading.createdAt }}</td>
          <td class="text-center">{{ reading.temperature }}</td>
          <td class="text-center">{{ reading.moisture }}</td>
          <td class="text-center">{{ reading.level }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import ReadingDataService from "@/services/ReadingDataService";

import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
  
export default {
  name: "ReadingList",
  components: { Line },
  data() {
    return {
      readings: [],
      chartData: {
        labels: [ ],
        datasets: [ 
          { 
            label: 'Temperature °C',
            data: [] 
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yTemp: {
            type: 'linear',
            display: true,
            position: 'left'
          },
          yMoist: {
            type: 'linear',
            display: true,
            position: 'right'
          },
    }
      },
      dataLoaded: false
    };
  },
  mounted() {
    const self = this
    this.timerHandler = setInterval(() => this.fetchReadings(), 5000)
    this.fetchReadings();
  },
  computed: {
    chartData() {
      return {
        labels: this.readings.slice(-20).map((reading) => reading.id),
        datasets: [ 
          { 
            label: 'Temperature °C',
            data: this.readings.slice(-20).map((reading) => reading.temperature),
            yAxisID: 'yTemp',
            borderColor: 'red'
          }, { 
            label: 'Soil Moisture %',
            data: this.readings.slice(-20).map((reading) => reading.moisture) ,
            yAxisID: 'yMoist',
            borderColor: 'blue'
          } 
          
        ]
      }
    }
  },
  methods: {
    fetchReadings() {
      ReadingDataService.getAll()
        .then((response) => {
          //const chartDataset = response.data.slice(0, 20)
          //this.chartData.datasets[0].data = chartDataset.map((reading) => reading.temperature)
          //this.chartData.labels = chartDataset.map((reading) => reading.id)
          this.readings = response.data
          this.readingsTable = this.readings.slice(-40).reverse()
          this.dataLoaded = true
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
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
