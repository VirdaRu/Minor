import {IAPI_Requests} from "./IAPI_Requests";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Constants}  from "../constants";
import {Offer} from "../../../models/offer";
import {SavedOffers} from "../../../models/savedoffers";
import {SessionHandler} from "../SessionHandler";

export class SavedOffersAPI_Requests implements IAPI_Requests
{
  constructor(private http: HttpClient)
  {

  }

  delete(id : any)
  {
    return this.http.delete(`${Constants.API_URL}/saved-offer`,
      { params: new HttpParams().set("offerid", id)
          .set("userid", SessionHandler.getUserSession()) });
  }

  get()
  {

  }

  getByID(id : any)
  {
    return this.http.get<Offer[]>(`${Constants.API_URL}/saved-offer`,
      { params: new HttpParams().set("userid", id) });
  }

  getByIDs(id : any, offerid : any)
  {
    return this.http.get(`${Constants.API_URL}/saved-offer/user-saved-offer`,
      { params: new HttpParams().set("offerid", offerid)
          .set("userid", id) })
  }

  post(body : any)
  {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    body = JSON.stringify(body);

    return this.http.post<SavedOffers>(`${Constants.API_URL}/saved-offer`,
      body,{'headers': headers});
  }

  put(body : any, id : any)
  {

  }

}
