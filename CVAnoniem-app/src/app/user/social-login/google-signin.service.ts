import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {

  private auth2: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);

  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '788323653867-n03o65gmfliornlj97on1b1h1mu9bdik.apps.googleusercontent.com'
      })
    })
  }

  public signIn() {
    this.auth2.signIn({
      this.subject.next(user)
    }).then(user => {
      this.subject.next(null)
    }).catch(() => {

    })
  }

  public signOut() {
    this.auth2.signOut()
      //
      .then(() => {
        this.subject.next(null)
      })
  }

  public observable(): observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }
}
