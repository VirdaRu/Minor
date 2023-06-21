import {IAPI_Requests} from "./IAPI_Requests";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Constants} from "../constants";

export class UserAPI_Requests implements IAPI_Requests {

  constructor(private http: HttpClient) {
  }

  delete(id: any): void {
  }

  get(): void {
  }

  getByID(id: any): void {
  }

  getThirdPartyID(TPid: string) {
    return this.http.get(`${Constants.API_URL}/user/user-with-thirdpartyid`,
      {params: new HttpParams().set("id", TPid)});
  }

  post(body: any) {
    return this.http.post(`${Constants.API_URL}/user`, body);
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
