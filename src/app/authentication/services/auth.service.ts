import { Injectable } from "@angular/core";
import { settings } from "../../config";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  logIn(credentials) {
    return this.http
      .post(`${settings.serverUrl}/admin/users/login`, credentials)
      .pipe(
        map((response: any) => {
          console.log("response from server ", response);
          /*{
             _id: req.user._id,
              isAdmin: req.user.isAdmin,
              username: req.user.username
          }*/
          if (response && response.token) {
            let user = new JwtHelperService().decodeToken(response.token);
            if (user.isAdmin == true) {
              localStorage.setItem("token", response.token);
              console.log("token stored");
              return true;
            }
            return false;
          }
          return false;
        })
      );
  }
  logOut() {
    this.router.navigate(["authentication/page-login"]);
    localStorage.removeItem("token");
    console.log("token removed");
  }
  isLogedIn() {
    let jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("token");
    if (!token) return false;
    //console.log("token", token);
    // console.log("isexpired", jwtHelper.isTokenExpired(token));

    return !jwtHelper.isTokenExpired(token);
  }
  get currentUser() {
    let token = localStorage.getItem("token");
    if (!token) return null;
    //console.log("decoded token ", new JwtHelperService().decodeToken(token));
    return new JwtHelperService().decodeToken(token);
  }
}
