import {IAPI_Requests} from "./IAPI_Requests";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Message} from "../../../models/message";

export class MessageAPI_Requests implements IAPI_Requests
{
  constructor(private http : HttpClient) { }

  delete(id : any): void
  {

  }

  get(): void
  {

  }

  getByID(id : any): void
  {
    this.http.get<Message[]>("https://localhost:7229/api/message",
      {params : new HttpParams().set("userid", id)});
  }

  post(body : any): void
  {

  }

  put(body : any, id : any): void {
  }

}
