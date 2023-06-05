
export interface IAPI_Requests
{
  get(): any;

  getByID(id: any): any;

  post(body: any): any;

  put(body: any, id: any): any;

  delete(id: any): any;
}
