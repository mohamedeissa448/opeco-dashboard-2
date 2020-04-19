import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { forkJoin } from "rxjs";
import { settings } from "../../../config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(private http: HttpClient) {}
  upload(file: File, url: String): Observable<boolean> {
    const endPoint = `${settings.serverUrl}/admin/${url}`;
    const formData: FormData = new FormData();
    formData.append("file", file, file.name);
    console.log("form data", formData);
    const headers = new HttpHeaders({
      Authorization: `bearer ${localStorage.getItem("token")}`
    });
    return this.http.post(endPoint, formData, { headers: headers }).pipe(
      map((response: any) => {
        if (response.msg == "success") return true;
        else return false;
      })
    );
  }
}
