import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {AuthRequest, Note, Token} from "./interface";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) {
  }

  BASE_URL: string = "http://localhost:8080"
  NOTE_PREF = "/note"
  AUTH_PREF = "/auth"

  registration(req: AuthRequest): Observable<any> {
    return this.http.post(this.BASE_URL + this.AUTH_PREF + "/reg", req)
  }

  login(req: AuthRequest): Observable<Token> {
    return this.http.post<Token>(this.BASE_URL + this.AUTH_PREF + "/login", req)
  }

  getRecords(checked: boolean): Observable<Note[]> {
    return this.http.get<Note[]>(this.BASE_URL + this.NOTE_PREF, {params: {checked}})
  }

  addRecord(record: Note): Observable<any> {
    return this.http.post(this.BASE_URL + this.NOTE_PREF, record)
  }

  deleteRecord(id: number): Observable<any> {
    return this.http.delete(this.BASE_URL + this.NOTE_PREF + "/" + id)
  }
}
