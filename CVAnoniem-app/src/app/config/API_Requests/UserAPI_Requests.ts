import {IAPI_Requests} from "./IAPI_Requests";
import {HttpClient, HttpParams} from "@angular/common/http";
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

  post(body: any): void {
  }

  put(body: any, id: any): void {
  }

}
