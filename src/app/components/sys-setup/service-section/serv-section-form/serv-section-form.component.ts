import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";

import { sectionServicesFormService } from "../../services/serv-section-form.service ";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: "serv-section-form",
  templateUrl: "./serv-section-form.component.html",
  styleUrls: ["./serv-section-form.component.css"]
})
export class serviceSectionFormComponent implements OnInit {
  public title;
  imageUrl;
  imageToUpload: File = null;
  isImageChosed: boolean = false;
  showErrorMSg: boolean;
  constructor(
    public sectionServicesFormService: sectionServicesFormService,
    private notificationService: NotificationsService,
    private dialogRef: MatDialogRef<serviceSectionFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.imageUrl = data.imageUrl;
  }

  ngOnInit() {}
  onClear() {
    this.sectionServicesFormService.form.reset();
  }

  onSubmit() {
    if (this.sectionServicesFormService.form.valid) {
      //on add a service
      if (this.title === "Add New Service") {
        this.upload("Add");
      } else if (this.title === "Edit A Service") {
        //update a service
        this.upload("Edit");
      }
      this.sectionServicesFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.sectionServicesFormService.form.reset();
    this.dialogRef.close();
  }
  handleImageFileInput(files: FileList) {
    this.imageToUpload = files.item(0);
    console.log("this.imageToUpload", this.imageToUpload);
    this.isImageChosed = this.isImageChosed == true ? false : true;
    if (this.imageToUpload) this.showErrorMSg = false;
    else if (!this.imageToUpload) {
      this.showErrorMSg = true;
    }
  }

  upload(type: string) {
    if (type == "Add") {
      this.sectionServicesFormService
        .addService(this.imageToUpload, {
          title: this.sectionServicesFormService.form.value.title,
          content: this.sectionServicesFormService.form.value.content
        })
        .subscribe(
          data => {
            if (data) {
              // this.notificationService.success(":: Uploaded Successfully");
            }
          },
          error => {
            alert("Upload wasn't a success,Please try again");
            console.log("error", error);
          }
        );
    } else {
      this.sectionServicesFormService
        .updateService(this.imageToUpload, {
          title: this.sectionServicesFormService.form.value.title,
          content: this.sectionServicesFormService.form.value.content,
          _id: this.sectionServicesFormService.form.value._id
        })
        .subscribe(
          data => {
            if (data) {
              // this.notificationService.success(":: Updated Successfully");
            }
          },
          error => {
            alert("Upload wasn't a success,Please try again");
            console.log("error", error);
          }
        );
    }
  }
}
