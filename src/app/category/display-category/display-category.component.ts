import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../database.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.css']
})
export class DisplayCategoryComponent implements OnInit {
  catId: string = "";
  name: string = "";
  description: string = "";
  image: string = "";
  createdAt: string = "";
  eventsList: any [] = [];
  events: any [] = [];
  eventsDb: any [] = [];

  constructor(private dbService: DatabaseService, private route: ActivatedRoute) {}

  ngOnInit(){
    const catId = this.route.snapshot.paramMap.get('catId');
    
    this.dbService.displayCategory(catId).subscribe((data:any) => {
      console.log(data)
      this.catId = data[0].catId;
      this.name = data[0].name;
      this.description = data[0].description;
      this.image = data[0].image;
      this.createdAt = data[0].createdAt;
      this.eventsList = data[0].eventList;
      

      this.dbService.listEvents().subscribe((eventsData: any) => {
        this.eventsDb = eventsData;
        for (let i = 0; i < this.eventsDb.length; i++) {
          for (let i = 0; i < this.eventsList.length; i++) {
            if (this.eventsList[i] == this.eventsDb[i]._id) {
              this.events.push(this.eventsDb[i])
            }
          }
        }
      });

    });
  }

}
