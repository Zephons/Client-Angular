import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Analysis } from '../core/model/analysis';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../core/service/notification.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})

export class AnalysisComponent implements OnInit {

  private express_port: string = 'http://localhost:3000';
  private socket = io(this.express_port);

  public analyses: Analysis[];

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  public startStream(keyword: string): void {
    this.http.get<Analysis[]>(`${this.express_port}/tweet/stream/${keyword}`);
    this.socket.on('stream', (res: Analysis[]) => {
      this.analyses = res;
    })
  }

  public stopStream(): void {
    this.http.get<any>(`${this.express_port}/tweet/stream/stop`);
  }

  public updateStream(): void {
    this.http.get<any>(`${this.express_port}/tweet/stream/update`);
  }

  ngOnInit() {

  }

}
