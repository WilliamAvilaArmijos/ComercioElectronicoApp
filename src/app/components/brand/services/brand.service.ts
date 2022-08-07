import { Inject, inject, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http'
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BASE_URL } from '../../../models/constants';
import { GlobalParams } from '../../../models/globalParams';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  //baseUrl = "https://localhost:7008";
  //baseUrl = environment.baseUrl;
  endpoint:string='';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http: HttpClient,
    @Inject(BASE_URL) endpoint:string) { 
      this.endpoint = endpoint;
    }

  getBrands(globalParams: GlobalParams):Observable<any>{

    let apiUrl = `${this.endpoint}/api/Brand/listar`;
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

  getBrandById(code:string):Observable<any> {
    let apiUrl= `${this.endpoint}/api/Brand/${code}`;
    console.log(apiUrl);
    
    return this.http.get(apiUrl);
  }

  createBrands(data:any): Observable<any>{
    let apiUrl = `${this.endpoint}/api/Brand`;
    return this.http.post(apiUrl,data);
  }

  updateBrand(code:string, data:any): Observable<any>{
    let apiUrl = `${this.endpoint}/api/Brand?code=${code}`;
    return this.http.put(apiUrl,data);
  }

  deleteBrand(code:string): Observable<any> {
    let apiUrl = `${this.endpoint}/api/Brand?code=${code}`;
    return this.http.delete(apiUrl);
  }

  // error(error: HttpErrorResponse){
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     errorMessage = error.error.error.message;
  //   }else{
  //     errorMessage = `Codigo error: ${error.status} mensaje: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(()=>{
  //     return errorMessage;
  //   });
  // }
}
