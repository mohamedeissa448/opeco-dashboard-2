import { ContactService } from "./../services/contact.service";
import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../services/notifications.service";
import { MatSnackBarConfig } from "@angular/material";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent {
  imageToUpload: File = null;
  isImageChosed: boolean = false;
  constructor(
    private contactService: ContactService,
    private notificationService: NotificationsService
  ) {}
  handleImageFileInput(files: FileList, image) {
    this.imageToUpload = files.item(0);
    console.log("this.imageToUpload", this.imageToUpload);
    console.log("before", this.isImageChosed);
    this.isImageChosed = this.isImageChosed == true ? false : true;
  }

  upload(f) {
    console.log("upload is running");
    this.contactService
      .upload(this.imageToUpload, {
        address: f.address
      })
      .subscribe(
        data => {
          if (data) {
            console.log("all success");
            this.notificationService.success("::  ALL Uploaded Successfully");
          }
        },
        error => {
          alert("Didn't upload,Please try again");
          console.log("error", error);
        }
      );
  }
}
