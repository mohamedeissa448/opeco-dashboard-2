import { AuthService } from "./../../../authentication/services/auth.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { settings } from "../../../config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class AboutUsService {
  constructor(private http: HttpClient) {}
  upload(image: File, pdf: File, body) {
    const endPoint = `${settings.serverUrl}/admin/about-us/update`;
    const formData: FormData = new FormData();
    formData.append("image", image, image.name);
    formData.append("pdf", pdf, pdf.name);
    formData.append("title", body.title);
    formData.append("content", body.content);
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
  get() {
    const headers = new HttpHeaders({
      Authorization: `bearer ${localStorage.getItem("token")}`
    });
    const endPoint = `${settings.serverUrl}/admin/about-us/get`;
    return this.http.get(endPoint, { headers: headers });
  }
}
