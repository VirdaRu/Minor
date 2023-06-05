import { Injectable } from '@angular/core';

export class SessionHandler {

  static setSession(userid : number)
  {
    sessionStorage.setItem("userid", userid.toString());
  }

  static getSession()
  {
    return Number(sessionStorage.getItem("userid"));
  }

}
