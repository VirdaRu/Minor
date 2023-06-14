import { Injectable } from '@angular/core';

export class SessionHandler {

  static setUserSession(userid : number)
  {
    sessionStorage.setItem("userid", userid.toString());
  }

  static getUserSession()
  {
    return Number(sessionStorage.getItem("userid"));
  }


  static setUsertypeSession(usertype : string)
  {
    sessionStorage.setItem("usertype", usertype);
  }

  static getUserTypeSession()
  {
    return sessionStorage.getItem("usertype");
  }

}
