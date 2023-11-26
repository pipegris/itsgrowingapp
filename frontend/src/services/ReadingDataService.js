import http from "../http-common";

class ReadingDataService {
  getAll() {
    return http.get("/reading");
  }
  create(data) {
    return http.post("/reading", data);
  }
}

export default new ReadingDataService();
