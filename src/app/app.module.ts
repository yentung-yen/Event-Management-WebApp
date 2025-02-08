import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from "./database.service";

import { AppComponent } from './app.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { ListEventsComponent } from './event/list-events/list-events.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { StatsComponent } from './category/stats/stats.component';
import { SpeechBotComponent } from './category/speech-bot/speech-bot.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { ConvertDurationFormatPipe } from './convert-duration-format.pipe';
import { DeleteEventComponent } from './event/delete-event/delete-event.component';
import { DisplayEventComponent } from './event/display-event/display-event.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UpdateEventComponent } from './event/update-event/update-event.component';
import { OperationStatsComponent } from './event/operation-stats/operation-stats.component';
import { ConvertUppercasePipe } from './convert-uppercase.pipe';
import { DisplayCategoryComponent } from './category/display-category/display-category.component';
import { TranslateComponent } from './event/translate/translate.component';

const appRoutes: Routes = [
  // no leading slash '/' in the path
  // order of routes matters - first-match wins strategy
  // more specific routes should be placed above less specific routes
  { path: "homepage", component: HomepageComponent },
  { path: "invalid-data", component: InvalidDataComponent },
  
  // Category
  { path: "add-category", component: AddCategoryComponent },
  { path: "list-category", component: ListCategoryComponent },
  { path: "delete-category", component: DeleteCategoryComponent },
  { path: "update-category", component: UpdateCategoryComponent },
  { path: "display-category/:catId", component: DisplayCategoryComponent },

  // Event
  { path: "add-event", component: AddEventComponent },
  { path: "list-events", component: ListEventsComponent },
  { path: "delete-event", component: DeleteEventComponent },
  { path: "display-event/:eventId", component: DisplayEventComponent },
  { path: "update-event", component: UpdateEventComponent },

  // Google APIs
  { path: "text-to-speech", component: SpeechBotComponent},
  { path: "translator", component: TranslateComponent },

  // Statistics
  { path: "stats", component: StatsComponent },
  { path: "operation-counter", component: OperationStatsComponent },

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
