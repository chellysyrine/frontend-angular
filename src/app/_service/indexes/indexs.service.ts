import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};


@Injectable({
  providedIn: 'root'
})
export class IndexsService {

  constructor(private _http: HttpClient) { 


  }


  public getAllindexs() : Observable<any>{
    return this._http.get('http://localhost:9200/_cat/indices',{responseType: 'text'});
  }
  
  

}


