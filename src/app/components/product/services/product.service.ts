import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/models/constants';
import { GlobalParams } from 'src/app/models/globalParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endpoint:string='';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http: HttpClient,
    @Inject(BASE_URL) endpoint:string) { 
      this.endpoint = endpoint;
    }

    getProducts(globalParams: GlobalParams):Observable<any>{

      let apiUrl = `${this.endpoint}/api/Product`;
      let params = new HttpParams();
      if (globalParams.search) {
        params = params.append('search' ,globalParams.search)
      }
      if (globalParams.order) {
        params = params.append('order' ,globalParams.order)
      }
      if (globalParams.sort) {
        params = params.append('sort' ,globalParams.sort)
      }
      if (globalParams.limit) {
        params = params.append('limit' ,globalParams.limit)
      }
      if (globalParams.offset) {
        params = params.append('offset' ,globalParams.offset)
      }
      return this.http.get(apiUrl,{params:params}) ;
    }

    getProductsById(id:string):Observable<any> {
      let apiUrl= `${this.endpoint}/api/Product/${id}`;
      console.log(apiUrl);
      
      return this.http.get(apiUrl);
    }
  
    createProducts(data:any): Observable<any>{
      let apiUrl = `${this.endpoint}/api/Product`;
      return this.http.post(apiUrl,data);
    }
  
    updateProducts(id:string, data:any): Observable<any>{
      let apiUrl = `${this.endpoint}/api/Product?id=${id}`;
      return this.http.put(apiUrl,data);
    }
  
    deleteProducts(id:string): Observable<any> {
      let apiUrl = `${this.endpoint}/api/Product?id=${id}`;
      return this.http.delete(apiUrl);
    }
}
