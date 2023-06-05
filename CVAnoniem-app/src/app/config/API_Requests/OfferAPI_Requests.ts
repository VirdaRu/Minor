import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IAPI_Requests} from "./IAPI_Requests";
import {Offer} from "../../../models/offer";
import {Constants} from "../constants";

export class OfferAPI_Requests implements IAPI_Requests
{
  constructor(private http : HttpClient) {

  }

  get()
  {

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

  }

  delete(id : any)
  {
    //return this.http.delete("https://localhost:7229/api/offer",
     // {params: new  HttpParams().set("id", id)})
  }

  getByID(id:any)
  {
    //return this.http.get<Offer[]>(`${Constants.API_URL}/offer/search-offers`,
    //  { params : new HttpParams().set('query',id)})
  }

}

