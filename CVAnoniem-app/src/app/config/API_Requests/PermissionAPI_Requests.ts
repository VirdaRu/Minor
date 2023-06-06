import {IAPI_Requests} from "./IAPI_Requests";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Constants} from "../constants";
import {SessionHandler} from "../../account/SessionHandler";

class PermissionAPI_Requests implements  IAPI_Requests
{

  constructor(private http : HttpClient) {
  }

  get(): void
  {

  }

  getByID(id:any): void
  {

  }

  post(body : any)
  {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    body = JSON.stringify(body);
    this.http.post(`${Constants.API_URL}/permission`,
      body,
      {'headers' : headers ,
        params : new HttpParams().set('senderid',
          SessionHandler.getSession())})
  }


  put(body : any, id : any): void
  {

  }

  delete(id : any): void
  {

  }

}
