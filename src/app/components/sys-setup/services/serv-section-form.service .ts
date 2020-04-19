import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { settings } from "../../../config";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class sectionServicesFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      title: new FormControl("", [Validators.required]),
      content: new FormControl("", [Validators.required]),
      imageUrl: new FormControl("")
    });
  }

  getservices() {
    const headers = new HttpHeaders({
      Authorization: `bearer ${localStorage.getItem("token")}`
    });
    return this.http.get(
      `${settings.serverUrl}/admin/services/getAllServices`,
      { headers: headers }
    );
  }
  addService(image: File, body): Observable<boolean> {
    const endPoint1 = `${settings.serverUrl}/admin/services/addService`;
    const formData: FormData = new FormData();
    formData.append("image", image, image.name);
    formData.append("title", body.title);
    formData.append("content", body.content);
    const headers = new HttpHeaders({
      Authorization: `bearer ${localStorage.getItem("token")}`
    });
    return this.http.post(endPoint1, formData, { headers: headers }).pipe(
      map((response: any) => {
        if (response.msg == "success") return true;
        else return false;
      })
    );
  }
  updateService(image: File, body) {
    const endPoint1 = `${settings.serverUrl}/admin/services/updateService`;
    const formData: FormData = new FormData();
    formData.append("image", image, image.name);
    formData.append("title", body.title);
    formData.append("content", body.content);
    formData.append("_id", body._id);
    const headers = new HttpHeaders({
      Authorization: `bearer ${localStorage.getItem("token")}`
    });
    return this.http.post(endPoint1, formData, { headers: headers }).pipe(
      map((response: any) => {
        if (response.msg == "success") return true;
        else return false;
      })
    );
  }
  popualteForm(service) {
    console.log("category", service);
    this.form.setValue({
      _id: service._id || "",
      title: service.title || "",
      content: service.content || "",
      imageUrl: service.imageUrl || ""
    });
  }
}
