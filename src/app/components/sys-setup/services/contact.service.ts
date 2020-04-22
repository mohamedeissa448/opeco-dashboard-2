import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { settings } from "../../../config";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  constructor(private http: HttpClient) {}
  upload(body) {
    const endPoint = `${settings.serverUrl}/admin/contact/update`;
    const formData: FormData = new FormData();
    //formData.append("image", image, image.name);
    /* formData.append("address", body.address);
    formData.append("email", body.email);
    formData.append("phone", body.phone);
    formData.append("fax", body.fax);
    formData.append("mapUrl", body.mapUrl);*/

    const headers = new HttpHeaders({
      Authorization: `bearer ${localStorage.getItem("token")}`
    });
    return this.http.post(endPoint, body, { headers: headers }).pipe(
      map((response: any) => {
        if (response.msg == "success") return true;
        else return false;
      })
    );
  }
  get() {
    const endPoint = `${settings.serverUrl}/admin/contact/get`;
    const headers = new HttpHeaders({
      Authorization: `bearer ${localStorage.getItem("token")}`
    });
    return this.http.get(endPoint, { headers: headers });
  }
}
