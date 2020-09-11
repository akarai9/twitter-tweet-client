import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetServicesService } from '../../../core-module/services/getservices.service';

@Component({
  selector: 'app-get-tweets',
  templateUrl: './get-tweets.component.html',
  styleUrls: ['./get-tweets.component.scss']
})
export class GetTweetsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: GetServicesService) { }

  searchTweet: FormGroup;
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
    this.searchTweet = this.formBuilder.group({
      name: ['', [Validators.required]],
    })
  }

  searchTweetAPI(status, page) {
    this.twitterSearchName = this.searchTweet.value.name;
    if(status == 1) {
      this.tweetResponse = [];
    }
    else {
      this.tweetResponse = this.tweetResponse;
    }
    this.page = page;
    let id;
    id = this.tweetResponse.length ? this.tweetResponse[this.tweetResponse.length - 1].id : ''
    this.service.getTweets(this.searchTweet.value.name, page, id)
    .subscribe((data: any) => {
      if(data.result.data.length < 10) {
        this.callApi = false;
      }
      this.tweetSearch = true;
      this.tweetResponse = this.tweetResponse.concat(data.result.data)
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
    if(!this.searchTweet.value.name) {
      this.tweetResponse = [];
      this.tweetSearch = false;
      this.callApi = true;
    }
  }

}
