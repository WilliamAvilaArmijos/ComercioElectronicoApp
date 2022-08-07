import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/models/constants';
import { GlobalParams } from 'src/app/models/globalParams';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  endpoint:string='';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http: HttpClient,
    @Inject(BASE_URL) endpoint:string) { 
      this.endpoint = endpoint;
    }

    getProductTypes(globalParams: GlobalParams):Observable<any>{

      let apiUrl = `${this.endpoint}/api/ProductType`;
      let params = new HttpParams();
      if (globalParams.search) {
        params = params.append('search' ,globalParams.search)
      }
      if (globalParams.order) {
        params = params.append('order' ,globalParams.order)
      }
      if (globalParams.sortProductType) {
        params = params.append('sort' ,globalParams.sortProductType)
      }
      if (globalParams.limit) {
        params = params.append('limit' ,globalParams.limit)
      }
      if (globalParams.offset) {
        params = params.append('offset' ,globalParams.offset)
      }
      return this.http.get(apiUrl,{params:params}) ;
    }
    getTypeById(code:string):Observable<any> {
      let apiUrl= `${this.endpoint}/api/ProductType/${code}`;
      console.log(apiUrl);
      
      return this.http.get(apiUrl);
    }
  
    createType(data:any): Observable<any>{
      let apiUrl = `${this.endpoint}/api/ProductType`;
      return this.http.post(apiUrl,data);
    }
  
    updateType(code:string, data:any): Observable<any>{
      let apiUrl = `${this.endpoint}/api/ProductType?code=${code}`;
      return this.http.put(apiUrl,data);
    }
  
    deleteType(code:string): Observable<any> {
      let apiUrl = `${this.endpoint}/api/ProductType?code=${code}`;
      return this.http.delete(apiUrl);
    }
}
