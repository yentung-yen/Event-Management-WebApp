import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../database.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
  eventsDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  // function which uses dbService to fetch all events from the db
  ngOnInit() {
    this.dbService.listEvents().subscribe((data: any) => {
      this.eventsDB = data;
    });
  }

  eventDeleter(eventId: string){
    this.dbService.deleteEvent(eventId).subscribe({
      next: (result:any) => {
        // get updated data
        this.dbService.listEvents().subscribe((data: any) => {
          this.eventsDB = data;
        });
      },
      error: (err) => {
        this.router.navigate(["/invalid-data"])
      }
    })
  }
}
