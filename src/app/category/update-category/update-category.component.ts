import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  catDb: any[] = [];
  catId: string = "";
  updateName: string = "";
  updateDesc: string = "";

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.dbService.listCategory().subscribe((data:any) => {
      this.catDb = data;
    })
  }

  //update category
  categoryUpdate() {
    let catObj = {
      catId: this.catId,
      name: this.updateName,
      description: this.updateDesc
    };
    this.dbService.updateCategory(catObj).subscribe(
      (result: any) => {
        this.router.navigate(["/list-category"]);
      },
      (err) => {
        this.router.navigate(["/invalid-data"]);
      }
    );
  }

  selectUpdate(selectedCat: string, selectedName: string, selectedDesc: string){
    this.catId = selectedCat;
    this.updateName = selectedName;
    this.updateDesc = selectedDesc;
  }
    
  }
  

