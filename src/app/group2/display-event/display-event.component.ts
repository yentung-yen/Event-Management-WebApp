import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../database.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css']
})
export class DisplayEventComponent implements OnInit{
  eventId: string = "";
  name: string = "";
  description: string = "";
  startDateTime: string = "";
  endDateTime: string = "";
  durationInMinutes!: number;
  isActive: boolean = true;
  image: string = "";
  capacity: number = 1000;
  ticketsAvailable!: number;
  categories: string = "";

  constructor(private dbService: DatabaseService, private route: ActivatedRoute) {}

  // function which uses dbService to fetch all events from the db
  ngOnInit() {
    // this.route: refers to an instance of ActivatedRoute - contains info on the current activated route
    // snapshot: gives information on the current state of the route
    // paramMap: contains a dictionary of the route parameters (ie dict: key value pairs of url params)
    // get('eventId'); - get value of key (ie param) 'eventId'
    const eventId = this.route.snapshot.paramMap.get('eventId');

    this.dbService.viewEvent(eventId).subscribe((data: any) => {
      this.eventId = data[0].eventId;
      this.name = data[0].name;
      this.description = data[0].description;
      this.startDateTime = data[0].startDateTime;
      this.endDateTime = data[0].endDateTime;
      this.durationInMinutes = data[0].durationInMinutes;
      this.isActive = data[0].isActive;
      this.image = data[0].image;
      this.capacity = data[0].capacity;
      this.ticketsAvailable = data[0].ticketsAvailable;
      this.categories = data[0].categories;
    });
  }

}
