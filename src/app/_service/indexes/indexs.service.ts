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
    return this._http.get('http://localhost:9200/_cat/indices',httpOptions);
  }
  public index_automate_wfl1_210518(): Observable<any> {
    return this._http.get('http://localhost:9200/automate_wfl1_210518*/_search?size=1500',httpOptions);
  }
 
  public index_automate_wfl1_210517(): Observable<any> {
    return this._http.get('http://localhost:9200/automate_wfl1_210517*/_search?size=1500',httpOptions);
  }

  public index_automate_wfl1_210514(): Observable<any> {
    return this._http.get('http://localhost:9200/automate_wfl1_210514*/_search?size=1500',httpOptions);
  }
  public index_automate_wfl1_210513(): Observable<any> {
    return this._http.get('http://localhost:9200/automate_wfl1_210513*/_search?size=1500',httpOptions);
  }
  public index_automate_wfl1_210511(): Observable<any> {
    return this._http.get('http://localhost:9200/automate_wfl1_210511*/_search?size=1500',httpOptions);
  }
  

}


