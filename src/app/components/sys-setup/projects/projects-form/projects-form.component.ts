import { projectsFormService } from "../../services/projects-form.service";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";

import { sectionServicesFormService } from "../../services/serv-section-form.service ";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: "projects-section-form",
  templateUrl: "./projects-form.component.html",
  styleUrls: ["./projects-form.component.css"]
})
export class projectsFormComponent implements OnInit {
  public title;
  imageUrl;
  showErrorMSg = false;
  imageToUpload: File = null;
  isImageChosed: boolean = false;
  constructor(
    public projectsFormService: projectsFormService,
    private notificationService: NotificationsService,
    private dialogRef: MatDialogRef<projectsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.imageUrl = data.imageUrl;
  }

  ngOnInit() {}
  onClear() {
    this.projectsFormService.form.reset();
  }

  onSubmit() {
    if (this.isImageChosed == false) {
      this.showErrorMSg = true;
    } else if (this.projectsFormService.form.valid) {
      //on add a service
      if (this.title === "Add New Project") {
        this.upload("Add");
      } else if (this.title === "Edit A Project") {
        //update a service
        this.upload("Edit");
      }
      this.projectsFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.projectsFormService.form.reset();
    this.dialogRef.close();
  }
  handleImageFileInput(files: FileList) {
    this.imageToUpload = files.item(0);
    console.log("this.imageToUpload", this.imageToUpload);
    this.isImageChosed = this.isImageChosed == true ? false : true;
    this.showErrorMSg = false;
  }

  upload(type: string) {
    if (type == "Add") {
      this.projectsFormService
        .addProject(this.imageToUpload, {
          title: this.projectsFormService.form.value.title,
          caption: this.projectsFormService.form.value.caption
        })
        .subscribe(data => {
          if (data) {
            this.notificationService.success(":: All Uploaded Successfully");
          } else {
            alert("Didn't upload,Please try again");
          }
        });
    } else {
      this.projectsFormService
        .updateProject(this.imageToUpload, {
          title: this.projectsFormService.form.value.title,
          caption: this.projectsFormService.form.value.caption,
          _id: this.projectsFormService.form.value._id
        })
        .subscribe(data => {
          if (data) {
            this.notificationService.success(":: All Updated Successfully");
          } else {
            alert("Didn't upload,Please try again");
          }
        });
    }
  }
}
