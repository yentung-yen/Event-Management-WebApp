import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from "./database.service";

import { AppComponent } from './app.component';
import { AddEventComponent } from './group2/add-event/add-event.component';
import { ListEventsComponent } from './group2/list-events/list-events.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddCategoryComponent } from './group1/add-category/add-category.component';
import { ListCategoryComponent } from './group1/list-category/list-category.component';
import { DeleteCategoryComponent } from './group1/delete-category/delete-category.component';
import { UpdateCategoryComponent } from './group1/update-category/update-category.component';
import { StatsComponent } from './group1/stats/stats.component';
import { SpeechBotComponent } from './group1/speech-bot/speech-bot.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { ConvertDurationFormatPipe } from './convert-duration-format.pipe';
import { DeleteEventComponent } from './group2/delete-event/delete-event.component';
import { DisplayEventComponent } from './group2/display-event/display-event.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UpdateEventComponent } from './group2/update-event/update-event.component';
import { OperationStatsComponent } from './group2/operation-stats/operation-stats.component';
import { ConvertUppercasePipe } from './convert-uppercase.pipe';
import { DisplayCategoryComponent } from './group1/display-category/display-category.component';
import { TranslateComponent } from './group2/translate/translate.component';

const appRoutes: Routes = [
  // no leading slash '/' in the path
  // order of routes matters - first-match wins strategy
  // more specific routes should be placed above less specific routes
  { path: "homepage", component: HomepageComponent },
  { path: "add-event", component: AddEventComponent },
  { path: "list-events", component: ListEventsComponent },
  { path: "delete-event", component: DeleteEventComponent },
  { path: "display-event/:eventId", component: DisplayEventComponent },
  { path: "update-event", component: UpdateEventComponent },
  { path: "operation-counter", component: OperationStatsComponent },
  { path: "translator", component: TranslateComponent },
  { path: "invalid-data", component: InvalidDataComponent },
  
  //Group 1
  { path: "add-category", component: AddCategoryComponent },
  { path: "list-category", component: ListCategoryComponent },
  { path: "delete-category", component: DeleteCategoryComponent },
  { path: "update-category", component: UpdateCategoryComponent },
  { path: "display-category/:catId", component: DisplayCategoryComponent },
  { path: "text-to-speech", component: SpeechBotComponent},
  { path: "stats", component: StatsComponent },

  { path: "", redirectTo: "/homepage", pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    ListEventsComponent,
    HomepageComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    DeleteCategoryComponent,
    UpdateCategoryComponent,
    StatsComponent,
    SpeechBotComponent,
    PageNotFoundComponent,
    InvalidDataComponent,
    ConvertDurationFormatPipe,
    DeleteEventComponent,
    DisplayEventComponent,
    UpdateEventComponent,
    OperationStatsComponent,
    ConvertUppercasePipe,
    DisplayCategoryComponent,
    TranslateComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes, { useHash: true }), FormsModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
