import { Component } from '@angular/core';
import { DatabaseService } from "../../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
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

  durationPlaceholder: string = "Enter Event duration (minutes)";

  // constructor has 2 dependencies: DatabaseService & Router
  constructor(private dbService: DatabaseService, private router: Router) {}

  // generates the new event object and passes it to the service
  // which sends it to the server via a post request.
  onSaveEvent() {
    let obj = { 
      eventId: this.eventId, 
      name: this.name, 
      description: this.description == "" ? 'Description Not Provided' : this.description, 
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime, 
      durationInMinutes: this.durationInMinutes, 
      isActive: this.isActive, 
      image: this.image == "" ? '/event-banner.png' : this.image,
      capacity: this.capacity, 
      ticketsAvailable: this.ticketsAvailable == undefined ? this.capacity : this.ticketsAvailable, 
      categories: this.categories, 
    };

    console.log(obj)

    this.dbService.addEvent(obj).subscribe({
      next: (result: any) => {
        // use the router service to redirect the client to list events component
        this.router.navigate(["/list-events"]);
      },
      error: (err) => {
        this.router.navigate(["/invalid-data"]);
      }
    });
  }
}
