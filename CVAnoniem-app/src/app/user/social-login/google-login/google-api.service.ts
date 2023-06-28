import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {Subject} from "rxjs";


const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  //clientId: '788323653867-3235j2n5oojmfk548lgqs919101chcr8.apps.googleusercontent.com',
  clientId: '934610700309-h717n627pkfb5s39518lbs4hhkn13lo7.apps.googleusercontent.com',
  scope: 'openid profile email',
}

export interface UserInfo {
  info: {
    sub: string,
    email: string,
    name: string,
    picture: string,
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInfo>

  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig)
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow()
        } else {
          oAuthService.loadUserProfile().then((userProfile) => {
            console.log(JSON.stringify(userProfile));
            this.userProfileSubject.next(userProfile as UserInfo)
          })
        }
      })
    })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  signOut(): void {
    this.oAuthService.logOut()
  }
}
