import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const URL = "http://localhost:8888"

// specify that body of post request in in json format
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  viewEventId: string = '';

  constructor(private http: HttpClient) { }

  // Category
  addCategory(data:any) {    
    return this.http.post("/api/v1/add-category", data, httpOptions)
  }

  listCategory(){
    return this.http.get("/api/v1/list-category")
  }

  deleteCategory(catId: string){
    let url = "/api/v1/delete-category/" + catId;
    return this.http.delete(url, httpOptions);
  }

  displayCategory(data: any) {
    let url = "/api/v1/category/" + data
    return this.http.get(url);
  } 

  updateCategory(data: any) {
    return this.http.put("/api/v1/update-category/", data, httpOptions);
  }


  // Event
  listEvents() {
    return this.http.get("/api/v1/events");    
  }

  addEvent(data:any) {
    return this.http.post("/api/v1/add-event", data, httpOptions);
  }

  deleteEvent(data: any) {
    let url = "/api/v1/delete-event/" + data;
    return this.http.delete(url, httpOptions);
  }

  viewEvent(data: any) {
    let url = "/api/v1/events/" + data
    return this.http.get(url);
  }

  updateEvent(data: any) {
    return this.http.put("/api/v1/update-event", data, httpOptions);
  }

  
  // show statistics of operations
  getStats() {
    return this.http.get("/api/v1/get-stats");    
  }

  getOperationCounter() {
    return this.http.get("/api/v1/get-counters");    
  }
}
