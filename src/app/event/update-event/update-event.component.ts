import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../database.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  eventsDB: any[] = [];
  eventId: string = '';
  newName!: string;
  newCapacity!: number;

  constructor(private dbService: DatabaseService, private router: Router) {}

  // function which uses dbService to fetch all events from the db
  ngOnInit() {
    this.dbService.listEvents().subscribe((data: any) => {
      this.eventsDB = data;
    });
  }

  eventUpdater(){
    let obj = { 
      eventId: this.eventId,
      name: this.newName, 
      capacity: this.newCapacity
    };

    this.dbService.updateEvent(obj).subscribe({
      next: (result:any) => {
        this.router.navigate(["/list-events"]);
      },
      error: (err) => {
        this.router.navigate(["/invalid-data"]);
      }
    })
  }

  eventSelector(selectedEvent: string, selectedName: string, selectedCapacity: number){
    this.eventId = selectedEvent;
    this.newName = selectedName;
    this.newCapacity = selectedCapacity;
  }
}
