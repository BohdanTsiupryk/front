import {Injectable} from '@angular/core';
import {HttpClientService} from "./http-client.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {AuthRequest} from "./interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private client: HttpClientService,
    private cookies: CookieService,
    private router: Router
  ) {
  }

  register(req: AuthRequest) {
    this.client.registration(req)
      .subscribe()
  }

  login(req: AuthRequest) {
    this.client.login(req)
      .subscribe(token => {

        this.cookies.set("auth_token", token.token)

        this.router.navigate(["/main"])
      })
  }
}
