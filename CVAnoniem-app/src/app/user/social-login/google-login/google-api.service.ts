import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {Subject} from "rxjs";

/**
 * the client id is the id of the app that is registered in the google cloud platform
 * the redirect uri is the uri that google will redirect to after the user has logged in this is defined in the cloud platform
 * the scope is the information that we want to get from the user
 * the issuer is the url of the google login page
 * */
const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '788323653867-3235j2n5oojmfk548lgqs919101chcr8.apps.googleusercontent.com',
  scope: 'openid profile email',
}

/**
 * this is the information that we want to get from the user
 * */
export interface UserInfo {
  info: {
    sub: string,
    email: string,
    name: string,
    picture: string,
  }
}

/**
 * this is the service that will handle the google login
 * it will use the angular-oauth2-oidc library to handle the login
 * it will use the AuthConfig to configure the login
 * it will use the UserInfo interface to get the information from the user
 * it will use the Subject to send the information to the components that need it
 * it will use the OAuthService to handle the login
 * it will use the hasValidAccessToken() to check if the user is logged in
 * it will use the logOut() to log the user out
 * it will use the loadUserProfile() to get the user information
 * */
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

  /**
   * this function will check if the user is logged in
   * */
  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  /**
   * this function will log the user out
   * */
  signOut(): void {
    this.oAuthService.logOut()
  }
}
