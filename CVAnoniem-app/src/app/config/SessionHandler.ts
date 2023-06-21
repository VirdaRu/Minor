export class SessionHandler {

  static setUserSession(userid : number)
  {
    sessionStorage.setItem("userid", userid.toString());
  }

  static getUserSession()
  {
    return Number(sessionStorage.getItem("userid"));
  }


  static setUsertypeSession(usertype: string) {
    sessionStorage.setItem("isemployer", usertype);
  }

  static getUserTypeSession() {
    return sessionStorage.getItem("isemployer");
  }

  static setUsername(username: string) {
    sessionStorage.setItem("username", username);
  }

  static getUsername() {
    return sessionStorage.getItem("username");
  }

  static setPicture(src: any) {
    sessionStorage.setItem("picture", src);
  }

  static getPicture() {
    return sessionStorage.getItem("picture");
  }

  static LogOutSessions() {
    sessionStorage.clear();
  }

}
