import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Analysis } from '../model/analysis';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private express_port: string = environment.express_port;

  constructor(private http: HttpClient) { }

  public getTweets(username: string): Observable<Analysis[]> {
    return this.http.get<Analysis[]>(`${this.express_port}/twitter/${username}`);
  }
}
