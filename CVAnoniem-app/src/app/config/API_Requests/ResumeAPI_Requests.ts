import {IAPI_Requests} from "./IAPI_Requests";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Constants} from "../constants";

export class ResumeAPI_Requests implements IAPI_Requests {
  constructor(private http: HttpClient) {
  }

  delete(id: number) {
    return this.http.delete(`${Constants.API_URL}/resume`);
  }

  get() {
    return this.http.get(`${Constants.API_URL}/resume`);
  }

  getByID(id: any) {
    return this.http.get(`${Constants.API_URL}/resume`,
      {
        params: new HttpParams().set("id", id)
      });
  }

  post(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    body = JSON.stringify(body);
    return this.http.post(`${Constants.API_URL}/resume`, body,
      {'headers': headers});
  }

  put(body: any, id: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    body = JSON.stringify(body);

    return this.http.put(`${Constants.API_URL}/resume`, body,
      {
        'headers': headers,
        params: new HttpParams().set("id", id)
      }
    );
  }

}
