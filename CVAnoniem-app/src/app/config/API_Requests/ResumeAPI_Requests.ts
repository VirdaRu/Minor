import {IAPI_Requests} from "./IAPI_Requests";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Constants} from "../constants";
import {Resume} from "../../../models/resume";
import {SessionHandler} from "../SessionHandler";

export class ResumeAPI_Requests implements IAPI_Requests {
  constructor(private http: HttpClient) {
  }

  delete(id: number) {
    return this.http.delete(`${Constants.API_URL}/resume`);
  }

  get() {
    return this.http.get<Resume[]>(`${Constants.API_URL}/resume`);
  }

  getByID(userid: any) {
    return this.http.get(`${Constants.API_URL}/resume`,
      {
        params: new HttpParams().set("id", userid)
      });
  }

  getByOfferID(Offerid: any, userID: any) {
    return this.http.get(`${Constants.API_URL}/resume/for-offer`, {
      'responseType': 'arraybuffer' as 'json',
      params: new HttpParams().set("offerid", Offerid).set("userID", userID)
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

  redact(infoToRedact: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    infoToRedact = JSON.stringify(infoToRedact);

    return this.http.get(`${Constants.API_URL}/resume/redact-resume`,
      {
        'headers': headers,
        params: new HttpParams().set("userID", SessionHandler.getUserSession())
          .set("toRedact", infoToRedact)
      });
  }

}
