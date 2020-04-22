import { settings } from "./../../../config";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}
  upload(body) {
    const endPoint = `${settings.serverUrl}/admin/analytics/update`;
    const headers = new HttpHeaders({
      Authorization: `bearer ${localStorage.getItem("token")}`
    });
    return this.http.post(endPoint, body, { headers: headers });
  }
  get() {
    const endPoint = `${settings.serverUrl}/admin/analytics/get`;
    const headers = new HttpHeaders({
      Authorization: `bearer ${localStorage.getItem("token")}`
    });
    return this.http.get(endPoint, { headers: headers });
  }
}
