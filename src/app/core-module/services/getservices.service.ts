import { Injectable } from '@angular/core';
import { CommonHttpService } from '../interceptors/header-interceptor';

@Injectable({
  providedIn: 'root'
})
export class GetServicesService {

  constructor(private commonHttpService: CommonHttpService) { }

  // Get Tweets
  getTweets(name, page, sinceid = '') {
    return this.commonHttpService.get(`get-tweets?handle=${name}&pageNo${page}&since=${sinceid}`);
  }

  // Get number of tweets metric
  getTweetMetric(name, until) {
    return this.commonHttpService.get(`get-graph-data?handle=${name}&until=${until}`);
  }

}
