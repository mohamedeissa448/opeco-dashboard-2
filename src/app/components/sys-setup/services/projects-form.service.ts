import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { settings } from "../../../config";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class projectsFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      title: new FormControl("", [Validators.required]),
      caption: new FormControl("", [Validators.required]),
      imageUrl: new FormControl("")
    });
  }

  getProjects() {
    const headers = new HttpHeaders({
      Authorization: `bearer ${localStorage.getItem("token")}`
    });
    return this.http.get(
      `${settings.serverUrl}/admin/projects/getAllProjects`,
      { headers: headers }
    );
  }
  addProject(image: File, body): Observable<boolean> {
    const endPoint1 = `${settings.serverUrl}/admin/projects/addProject`;
    const formData: FormData = new FormData();
    formData.append("image", image, image.name);
    formData.append("title", body.title);
    formData.append("caption", body.caption);
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
  updateProject(image: File, body) {
    const endPoint1 = `${settings.serverUrl}/admin/projects/updateProject`;
    const formData: FormData = new FormData();
    formData.append("image", image, image.name);

    formData.append("title", body.title);
    formData.append("caption", body.caption);
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
  popualteForm(project) {
    console.log("project", project);
    this.form.setValue({
      _id: project._id || "",
      title: project.title || "",
      caption: project.caption || "",
      imageUrl: project.imageUrl || ""
    });
  }
}
