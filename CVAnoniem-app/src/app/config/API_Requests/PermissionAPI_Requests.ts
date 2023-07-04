import {IAPI_Requests} from "./IAPI_Requests";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Constants} from "../constants";
import {SessionHandler} from "../SessionHandler";

export class PermissionAPI_Requests implements  IAPI_Requests
{

  constructor(private http : HttpClient) {
  }

  get()
  {

  }

  getByID(id: any) {
    return this.http.get(`${Constants.API_URL}/permission`,
      {params: new HttpParams().set('id', SessionHandler.getUserSession())}
    );
  }

  getByEmployer(id: any) {
    return this.http.get(`${Constants.API_URL}/permission/for-employer`,
      {params: new HttpParams().set('id', SessionHandler.getUserSession())}
    );
  }

  post(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    body = JSON.stringify(body);
    return this.http.post(`${Constants.API_URL}/permission`,
      body,
      {
        'headers': headers,
        params : new HttpParams().set('senderid',
          SessionHandler.getUserSession())})
  }


  put(body : any, id : any): void
  {

  }

  delete(id : any)
  {
    return this.http.delete(`${Constants.API_URL}/permission`,
      { params : new HttpParams().set('id', id )});
  }

}
