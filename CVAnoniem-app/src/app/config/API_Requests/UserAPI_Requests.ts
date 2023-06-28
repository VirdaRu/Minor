import {IAPI_Requests} from "./IAPI_Requests";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Constants} from "../constants";
import {User} from "../../../models/user";

export class UserAPI_Requests implements IAPI_Requests {

  constructor(private http: HttpClient) {
  }

  delete(id: any): void {
  }

  get(): void {

  }

  getByID(id: any): void {
  }

  getUserExist(email: string, password: string) {
    return this.http.get<User>(`${Constants.API_URL}/user/user-exist`,
      {
        params: new HttpParams().set("email", email)
          .set("password", password)
      });
  }

  getUserExistByEmail(email: string) {
    return this.http.get<User>(`${Constants.API_URL}/user/user-exist-email`,
      {
        params: new HttpParams().set("email", email)
      });
  }

  getThirdPartyID(TPid: string) {
    return this.http.get(`${Constants.API_URL}/user/user-with-thirdpartyid`,
      {params: new HttpParams().set("id", TPid)});
  }

  post(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.post(`${Constants.API_URL}/user`, body,
      {'headers': headers});
  }

  getUsertype(id: number) {
    return this.http.get(`${Constants.API_URL}/user/usertype`,
      {params: new HttpParams().set("id", id)});
  }

  postUsingThirdParty(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.post(`${Constants.API_URL}/user/third-party`, body, {'headers': headers});
  }

  put(body: any, id: any): void {

  }

}
