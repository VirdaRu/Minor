import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
  public readonly API_ENDPOINT: string = "https://localhost:7229/api/offer/all-offers-list";
  //public readonly API_MOCK_ENDPOINT: string = 'mock-domain/api';
}
