import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';
import { Analysis } from '../model/analysis';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient) { }

}
