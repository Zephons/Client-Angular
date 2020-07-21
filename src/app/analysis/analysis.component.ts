import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/service/notification.service';
import { AnalysisService } from '../core/service/analysis.service';
import { Analysis } from '../core/model/analysis';
import { NotificationType } from '../core/enumeration/notification-type.enum';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})

export class AnalysisComponent implements OnInit {
  public refreshing: boolean;

  chartVisible = false;
  chartOptions = {
    responsive: true
  };

  public chartData: any[] = [
    {data: [], label: 'Negative'},
    {data: [], label: 'Positive'}
  ];

  chartLabels = [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ];

  public doughnutChartLabels: string[] = [ 'Negative', 'Positive', 'Netral' ];
  public doughnutChartData: number[] = [ 350, 450, 100 ];
  public doughnutChartType: string = 'doughnut';

  data: any;
  account: string;
  tmp: string;
  positive = 0;
  negative = 0;
  netral = 0;

  constructor(private analysisService: AnalysisService, private notificationService: NotificationService) { }

  ngOnInit() {

  }

  onChartClick( event ) {
    console.log(event);
  }

  onKey( value: string ) {
    console.log('Get me tweets', value);
  }

  onSubmit( account: string ) {
    this.analysisService.getTweets(account)
      .subscribe(response => {
          this.data = response;
          this.account = account;
          this.positive = 0;
          this.negative = 0;
          this.netral = 0;
          this.setDataForChart(this.data);
          this.chartVisible = true;
        },
        error => console.log(error));
  }

  private setDataForChart( tweets ) {
    let clone = this.chartData;
    const dataPositive = [];
    const dataNegative = [];
    for (let i = 0; i < tweets.length; i++) {
      if (tweets[ i ].sentiment.comparative > 0) {
        dataPositive[ i ] = tweets[ i ].sentiment.comparative;
        dataNegative[ i ] = 0;
      } else {
        dataNegative[ i ] = tweets[ i ].sentiment.comparative;
        dataPositive[ i ] = 0;
      }
      this.setCountSentimentalTweets(tweets[ i ].sentiment.comparative);
    }
    clone[ 0 ].data = dataNegative;
    clone[ 1 ].data = dataPositive;

    this.chartData = clone;
  }

  private setCountSentimentalTweets( tweet ) {
    let clone = [];
    if (tweet > 0) {
      this.positive++;
    }
    else if (tweet < 0) {
      this.negative++;
    }
    else {
      this.netral++;
    }
    clone[ 0 ] = this.negative;
    clone[ 1 ] = this.positive;
    clone[ 2 ] = this.netral;
    this.doughnutChartData = clone;
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

}
