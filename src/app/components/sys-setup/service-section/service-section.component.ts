import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { sectionServicesFormService } from "../services/serv-section-form.service ";
import { MatTableDataSource } from "@angular/material/table";
import { serviceSectionFormComponent } from "./serv-section-form/serv-section-form.component";
import { take } from "rxjs/operators";

@Component({
  selector: "services",
  templateUrl: "service-section.component.html",
  styleUrls: ["service-section.component.css"]
})
export class serviceSectionComponent {
  public services;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Title", "Content", "Image", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private sectionService: sectionServicesFormService
  ) {}

  ngOnInit() {
    this.initializeTable();
  }
  initializeTable() {
    this.sectionService.getservices().subscribe((response: any) => {
      console.log("response", response);
      this.services = new MatTableDataSource(response.services);
      console.log("services", this.services);
      this.services.sort = this.sort;
      this.services.paginator = this.paginator;
    });
  }
  onAdd() {
    this.sectionService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Service" };
    this.dialog.open(serviceSectionFormComponent, dialogConfig);
    this.dialog._afterAllClosed.pipe(take(1)).subscribe(() => {
      this.initializeTable();
    });
  }
  onEdit(element) {
    this.sectionService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit A Service", imageUrl: element.imageUrl };

    this.dialog.open(serviceSectionFormComponent, dialogConfig);
    this.dialog._afterAllClosed.pipe(take(1)).subscribe(() => {
      this.initializeTable();
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.services.filter = this.searchKey.trim().toLowerCase();
  }
}
