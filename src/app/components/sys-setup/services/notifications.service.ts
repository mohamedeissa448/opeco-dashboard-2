import { Injectable, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class NotificationsService {
  constructor(private snackBar: MatSnackBar) {}
  ngOnInit(): void {}
  success(msg) {
    console.log("notifi");
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
  failed(msg) {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}
