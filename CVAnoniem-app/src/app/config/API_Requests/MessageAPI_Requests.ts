import {IAPI_Requests} from "./IAPI_Requests";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Message} from "../../../models/message";
import {Constants} from "../constants";

export class MessageAPI_Requests implements IAPI_Requests
{
  constructor(private http : HttpClient) { }

  delete(id : any)
  {
    return this.http.delete(`${Constants.API_URL}/message`,
      {params : new HttpParams().set("id", id)});
  }

  get() {
    return this.http.get<Message[]>(`${Constants.API_URL}/message/all-messages`);
  }

  getByID(id : any)
  {
    return this.http.get<Message[]>(`${Constants.API_URL}/message`,
      {params : new HttpParams().set("userid", id)});
  }

  post(body : any)
  {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    body = JSON.stringify(body);

    return this.http.post(`${Constants.API_URL}/message`, body,
      {'headers' : headers});
  }

  put(body : any, id : any): void {
  }

}
