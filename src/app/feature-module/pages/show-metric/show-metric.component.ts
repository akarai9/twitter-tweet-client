import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetServicesService } from 'src/app/core-module/services/getservices.service';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-show-metric',
  templateUrl: './show-metric.component.html',
  styleUrls: ['./show-metric.component.scss']
})
export class ShowMetricComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [2, 2, 2, 2, 2, 2, 2], label: 'No of tweets per day',
      backgroundColor: '#007bff', hoverBackgroundColor: '#007bff', borderColor: '#007bff'
    }
  ];
  constructor(private formBuilder: FormBuilder, private service: GetServicesService) { }

  getMetric: FormGroup;
  tweetResponse: any = [];
  tweetSearch: boolean = false;
  twitterSearchName: string = '';
  page: number = 0;
  callApi = true;

  ngOnInit() {
    this.initTweetForm();
  }

  // Initializing Form
  initTweetForm() {
    this.getMetric = this.formBuilder.group({
      name: ['', [Validators.required]],
    })
  }

  searchTweetAPI(status, page) {
    this.twitterSearchName = this.getMetric.value.name;
    if (status == 1) {
      this.tweetResponse = [];
    }
    else {
      this.tweetResponse = this.tweetResponse;
    }
    this.page = page;
    let until;
    until = `${new Date().getFullYear()}-${new Date().getMonth() < 9 ? '0' + (new Date().getMonth() + 1) :
      new Date().getMonth() + 1}-${new Date().getDate() < 10 ? '0' + (new Date().getDate()) :
        new Date().getDate()}`;
    this.service.getTweetMetric(this.getMetric.value.name, until)
      .subscribe((data: any) => {
        data.result.data.forEach((element, index) => {
          this.barChartData[0].data[index] = element.value;
        });
        console.log(this.tweetResponse);
      })
  }

  onScroll() {
    if (this.tweetSearch == true && this.callApi) {
      this.page++;
      this.searchTweetAPI(2, this.page);
    }
  }

  onBlankInput() {
    if (!this.getMetric.value.name) {
      this.tweetResponse = [];
      this.tweetSearch = false;
      this.callApi = true;
    }
  }

}
