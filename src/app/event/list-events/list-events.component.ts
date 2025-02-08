import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  eventsDB: any[] = [];
  
  constructor(private dbService: DatabaseService, private router: Router) {}

  // function which uses dbService to fetch all events from the db
  ngOnInit() {
    this.dbService.listEvents().subscribe((data: any) => {
      this.eventsDB = data;
    });
  }
}
