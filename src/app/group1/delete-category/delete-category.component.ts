import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit{
  catDb: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  //Get all category
  onListCategory() {
    return this.dbService.listCategory().subscribe((data: any) => {
      this.catDb = data;
    });
  }

  //Delete category
  onDeleteCategory(catId: any) {
    this.dbService.deleteCategory(catId).subscribe(result => {
      this.onListCategory();
      this.router.navigate(["/list-category"]);
      }, (err) => {
        this.router.navigate(["/invalid-data"]);
      }
    );
  }

  // This callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onListCategory();
  }


  }



