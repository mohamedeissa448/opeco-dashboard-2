import { projectsSectionComponent } from "./projects/projects.component";
import { HomeComponent } from "./home/home.component";

import { NgModule } from "@angular/core";
import { routing } from "./sys-setup.routing";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule, MatNativeDateModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDividerModule } from "@angular/material/divider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AboutUsComponent } from "./about-us/about-us.component";
import { serviceSectionComponent } from "./service-section/service-section.component";
import { serviceSectionFormComponent } from "./service-section/serv-section-form/serv-section-form.component";
import { projectsFormComponent } from "./projects/projects-form/projects-form.component";
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    routing,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    AboutUsComponent,
    HomeComponent,
    serviceSectionComponent,
    serviceSectionFormComponent,
    projectsSectionComponent,
    projectsFormComponent,
    ContactComponent
  ],
  entryComponents: [serviceSectionFormComponent, projectsFormComponent]
})
export class SysSetupModule {}
