import { settings } from "./../../../config";
import { ContactService } from "./../services/contact.service";
import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../services/notifications.service";
import { MatSnackBarConfig } from "@angular/material";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  imageToUpload: File = null;
  isImageChosed: boolean = false;
  contact: object = {};
  serverUrl: string = "";
  constructor(
    private contactService: ContactService,
    private notificationService: NotificationsService
  ) {}
  ngOnInit() {
    this.serverUrl = settings.serverUrl;
    this.getData();
  }
  getData() {
    this.contactService.get().subscribe(
      (response: any) => {
        if (response.contact) {
          this.contact = response.contact;
          console.log("this.contact", this.contact);
        } else {
        }
      },
      error => {
        alert("Unexpected error has happened,Please try again later");
        console.log("error", error);
      }
    );
  }
  /* handleImageFileInput(files: FileList, image) {
    this.imageToUpload = files.item(0);
    console.log("this.imageToUpload", this.imageToUpload);
    console.log("before", this.isImageChosed);
    this.isImageChosed = this.isImageChosed == true ? false : true;
  }*/

  upload(f) {
    console.log("upload is running");
    this.contactService
      .upload({
        address: f.address,
        phone: f.phone,
        email: f.email,
        fax: f.fax,
        mapUrl: f.mapUrl
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
