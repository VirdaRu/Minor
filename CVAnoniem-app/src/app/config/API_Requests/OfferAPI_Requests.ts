import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IAPI_Requests} from "./IAPI_Requests";
import {Offer} from "../../../models/offer";
import {Constants} from "../constants";

export class OfferAPI_Requests implements IAPI_Requests {

  constructor(private http: HttpClient) {

  }

  get() {
    return this.http.get<Offer[]>(`${Constants.API_URL}/offer/all-offers-list`);
  }

  getLimit(limit: number)
  {
    return this.http.get<Offer[]>(`${Constants.API_URL}/offer/limit-offers-list`,
      {params : new HttpParams().set("limit", limit)});
  }


  getByJobseekerID(id: number)
  {
    return this.http.get<Offer[]>(`${Constants.API_URL}/offer`,
      {params : new HttpParams().set("userid", id)});
  }

  getByOfferID(id: number)
  {
    return this.http.get<Offer[]>(`${Constants.API_URL}/offer/offer-by-id`,
      {params : new HttpParams().set("offerid", id)});
  }

  postWithResume(body : FormData, offer : string)
  {
    return this.http.post(`${Constants.API_URL}/offer`,
      body, {params: new  HttpParams().set("offer", offer)});
  }

  putWithResume(body : FormData, offer : string)
  {
    return this.http.put(`${Constants.API_URL}/offer`,
      body, {params: new  HttpParams().set("updatedOffer", offer)});
  }

  post(body : any)
  {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    body = JSON.stringify(body);

    return this.http.post(`${Constants.API_URL}/offer`,
      body,
      {'headers': headers});
  }


  put(body : any, id : any)
  {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    body = JSON.stringify(body);

    return this.http.put(`${Constants.API_URL}/offer`,
      body,
      {'headers': headers});
  }

  delete(id : any)
  {
    return this.http.delete(`${Constants.API_URL}/offer`,
      {params: new  HttpParams().set("id", id)})
  }

  getByID(id:any)
  {
    return this.http.get<Offer[]>(`${Constants.API_URL}/offer/search-offers`,
        { params : new HttpParams().set('query',id)})
  }



  checkOfferExist(id : any)
  {
    return this.http.get(`${Constants.API_URL}/offer/user-has-offer`,
      {params: new HttpParams().set("userid", id)})
  }

}

