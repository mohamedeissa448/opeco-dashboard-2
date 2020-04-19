import { AboutUsService } from "./../services/aboutUs.service";
import { Component } from "@angular/core";
import { NotificationsService } from "../services/notifications.service";

@Component({
  selector: "ngx-list",
  templateUrl: "about-us.component.html",
  styleUrls: ["about-us.component.css"]
})
export class AboutUsComponent {
  imageToUpload: File = null;
  pdfToUpload: File = null;
  isImageChosed: boolean = false;
  isPdfChosed: boolean = false;
  constructor(
    private aboutUsService: AboutUsService,
    private notificationService: NotificationsService
  ) {}
  handleImageFileInput(files: FileList, image) {
    this.imageToUpload = files.item(0);
    console.log("this.imageToUpload", this.imageToUpload);
    console.log("before", this.isImageChosed);
    this.isImageChosed = this.isImageChosed == true ? false : true;
  }
  handlePdfFileInput(files: FileList) {
    console.log("files", files);
    this.pdfToUpload = files.item(0);
    console.log("this.pdfToUpload", this.pdfToUpload);
    this.isPdfChosed = this.isPdfChosed == true ? false : true;
  }
  upload(f) {
    console.log("upload is running");
    this.aboutUsService
      .upload(this.imageToUpload, this.pdfToUpload, {
        title: f.title,
        content: f.content
      })
      .subscribe(
        data => {
          if (data) {
            console.log("all success");
            this.notificationService.success("::  All Uploaded Successfully");
          }
        },
        error => {
          alert("Didn't upload,Please try again");
          console.log("error", error);
        }
      );
  }
}
