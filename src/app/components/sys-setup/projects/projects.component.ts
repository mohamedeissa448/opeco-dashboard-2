import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { sectionServicesFormService } from "../services/serv-section-form.service ";
import { MatTableDataSource } from "@angular/material/table";
import { projectsFormComponent } from "./projects-form/projects-form.component";
import { take } from "rxjs/operators";
import { projectsFormService } from "../services/projects-form.service";

@Component({
  selector: "projects",
  templateUrl: "projects.component.html",
  styleUrls: ["projects.component.css"]
})
export class projectsSectionComponent {
  public projects;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Title", "Caption", "Image", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private projectsService: projectsFormService
  ) {}

  ngOnInit() {
    this.initializeTable();
  }
  initializeTable() {
    this.projectsService.getProjects().subscribe((response: any) => {
      console.log("response", response);
      this.projects = new MatTableDataSource(response.projects);
      console.log("projects", this.projects);
      this.projects.sort = this.sort;
      this.projects.paginator = this.paginator;
    });
  }
  onAdd() {
    this.projectsService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Project" };
    this.dialog.open(projectsFormComponent, dialogConfig);
    this.dialog._afterAllClosed.pipe(take(1)).subscribe(() => {
      this.initializeTable();
    });
  }
  onEdit(element) {
    this.projectsService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit A Project", imageUrl: element.imageUrl };

    this.dialog.open(projectsFormComponent, dialogConfig);
    this.dialog._afterAllClosed.pipe(take(1)).subscribe(() => {
      this.initializeTable();
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    if (this.projects)
      this.projects.filter = this.searchKey.trim().toLowerCase();
  }
}
