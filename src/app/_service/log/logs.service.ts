import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};


@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private _http: HttpClient) { 
  }
  public Afficher(): Observable<any> {
    return this._http.get('http://localhost:9200/datafinal/_search?size=1500',httpOptions);
  }

}
