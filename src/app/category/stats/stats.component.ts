import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  statsDb: any [] = [];
  numCategory: number = 1;
  numEvents: number = 1;


  constructor(private dbService: DatabaseService, private router: Router) {}



  ngOnInit() {
    this.dbService.getStats().subscribe((data: any) => {
      this.statsDb = data;
      this.numCategory = data.categories;
      this.numEvents = data.events;
    });
  }


}
