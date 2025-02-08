import { Component } from '@angular/core';
import { DatabaseService } from "../../database.service";
import { Router } from "@angular/router";



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  catId: string = "";
  name: string = "";
  description: string = "";
  image: string = "";
  createdAt: string = "";

  constructor(private dbService: DatabaseService, private router:Router){}

  saveCategory(){
    let catObj = {
      catId: this.catId,
      name: this.name,
      description: this.description == "" ? 'Description Not Provided' : this.description, 
      image: this.image == "" ? '/default-img.png' : this.image,
      createdAt: this.createdAt
      
    };
    
    console.log(catObj); 

    this.dbService.addCategory(catObj).subscribe({ 
      next: (result: any) => { this.router.navigate(["/list-category"])},
      error: (err) => {
        this.router.navigate(["/invalid-data"]);
      }
    }); 

  }




  
}
