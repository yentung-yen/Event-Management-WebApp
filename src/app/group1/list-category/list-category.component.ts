import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  catDb: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }
  ngOnInit() {
    this.dbService.listCategory().subscribe((data: any) => {
      this.catDb = data;
    });

  }
}
