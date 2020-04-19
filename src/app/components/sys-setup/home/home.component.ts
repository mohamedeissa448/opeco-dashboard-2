import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../services/notifications.service";
import { HomeService } from "../services/home.service";

@Component({
  selector: "ngx-stepper",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.css"]
})
export class HomeComponent {
  fileToUpload: File = null;
  isImageChosed: boolean = false;

  constructor(
    private homeService: HomeService,
    private notificationService: NotificationsService
  ) {}
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log("this.fileToUpload", this.fileToUpload);
    this.isImageChosed = this.isImageChosed == true ? false : true;
  }
  uploadFileToActivity() {
    this.homeService
      .upload(this.fileToUpload, "home/updateBannerImage")
      .subscribe(
        data => {
          if (data) {
            this.notificationService.success("Image Uploaded Successfully");
          }
        },
        error => {
          alert("Didn't upload,Please try again");
        }
      );
  }
}
