import { settings } from "./../../../config";
import { AboutUsService } from "./../services/aboutUs.service";
import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../services/notifications.service";

@Component({
  selector: "ngx-list",
  templateUrl: "about-us.component.html",
  styleUrls: ["about-us.component.css"]
})
export class AboutUsComponent implements OnInit {
  imageToUpload: File = null;
  pdfToUpload: File = null;
  isImageChosed: boolean = false;
  isPdfChosed: boolean = false;
  serverUrl: String;
  aboutUs: any;

  constructor(
    private aboutUsService: AboutUsService,
    private notificationService: NotificationsService
  ) {}
  ngOnInit() {
    this.serverUrl = settings.serverUrl;
    this.getData();
  }
  getData() {
    this.aboutUsService.get().subscribe(
      (response: any) => {
        if (response.aboutUs) {
          this.aboutUs = response.aboutUs;
        } else {
        }
      },
      error => {
        alert("Unexpected error has happened,Please try again later");
        console.log("error", error);
      }
    );
  }
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
            this.getData();
          }
        },
        error => {
          alert("Didn't upload,Please try again");
          console.log("error", error);
        }
      );
  }
}
