import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "./database.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Event Management App";
  createdCounter: boolean = false;

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    // to create operation counter data at the start
    this.dbService.getOperationCounter().subscribe((data: any) => {
      this.createdCounter = true;
    });
  }
}
