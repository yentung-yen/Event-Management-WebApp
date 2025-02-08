import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-operation-stats',
  templateUrl: './operation-stats.component.html',
  styleUrls: ['./operation-stats.component.css']
})
export class OperationStatsComponent implements OnInit {
  operationsDB: any[] = [];
  recordsCreatedNum: number = 1;
  recordsDeletedNum: number = 1;
  recordsUpdatedNum: number = 1;
  
  constructor(private dbService: DatabaseService, private router: Router) {}

  // function which uses dbService to fetch all operations from the db
  ngOnInit() {
    this.dbService.getOperationCounter().subscribe((data: any) => {
      this.operationsDB = data;

      this.recordsCreatedNum = data.recCreated;
      this.recordsDeletedNum = data.recDeleted;
      this.recordsUpdatedNum = data.recUpdated;
    });
  }
}
