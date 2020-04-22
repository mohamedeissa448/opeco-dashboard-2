import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../services/notifications.service";
import { HomeService } from "../services/home.service";
import { settings } from "../../../config";

@Component({
  selector: "ngx-stepper",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.css"]
})
export class HomeComponent implements OnInit {
  fileToUpload: File = null;
  isImageChosed: boolean = false;
  serverUrl: String;
  currentImageUrl: String = "";
  constructor(
    private homeService: HomeService,
    private notificationService: NotificationsService
  ) {}
  ngOnInit() {
    this.serverUrl = settings.serverUrl;
    this.getImage();
  }
  getImage() {
    this.homeService.getCurrentImageUrl().subscribe(
      (data: any) => {
        if (data) {
          this.currentImageUrl = data.bannerImageUrl;
        } else {
        }
        console.log("response", data);
      },
      error => {
        alert("Unexpected error has happened,Please try again later");
        console.log("error", error);
      }
    );
  }
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
            this.getImage();
          }
        },
        error => {
          alert("Didn't upload,Please try again");
        }
      );
  }
}
