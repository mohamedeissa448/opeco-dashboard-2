import { NotificationsService } from "./../services/notifications.service";
import { AnalyticsService } from "./../services/analytics.service";
import { settings } from "./../../../config";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-analytics-configuration",
  templateUrl: "./analytics-configuration.component.html",
  styleUrls: ["./analytics-configuration.component.css"]
})
export class AnalyticsConfigurationComponent implements OnInit {
  imageToUpload: File = null;
  isImageChosed: boolean = false;
  analytics: String = "";
  serverUrl: string = "";
  constructor(
    private analyticsService: AnalyticsService,
    private notificationService: NotificationsService
  ) {}
  ngOnInit() {
    this.serverUrl = settings.serverUrl;
    this.getData();
  }
  getData() {
    this.analyticsService.get().subscribe(
      (response: any) => {
        if (response.analytics) {
          this.analytics = response.analytics;
          console.log("this.analytics", this.analytics);
        } else {
        }
      },
      error => {
        alert("Unexpected error has happened,Please try again later");
        console.log("error", error);
      }
    );
  }

  upload(f) {
    console.log("upload is running");
    this.analyticsService
      .upload({
        analytics: f.analytics
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
