import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {

  nameUrl: string;
  urlShort: string;
  urlProcessed: boolean;
  loading: boolean;
  showError: boolean;
  textError: string;

  constructor(
    private _shortUrlService: ShortUrlService
  ) {
    this.nameUrl = '';
    this.urlShort = '';
    this.urlProcessed = false;
    this.loading = false;
    this.showError = false;
    this.textError = '';
  }

  ngOnInit(): void {
  }

  processUrl() {

    if(this.nameUrl === ''){
      this.error('Please enter a url.');
      return;
    }

    this.urlProcessed = false;
    this.loading = true;

    setTimeout(() => {
      this.getUrlShort();
    }, 2000);
  }

  getUrlShort() {
    this._shortUrlService.getUrlShort(this.nameUrl).subscribe(data => {
      this.loading = false;
      this.urlProcessed = true;
      this.urlShort = data.link;
    }, error => {
      this.loading = false;
      this.nameUrl = '';
      if(error.error.description === 'The value provided is invalid.') {
        this.error('Please enter a valid url.');
      }
    });
  }

  error(value: string) {
    this.showError = true;
    this.textError = value;

    setTimeout(() => {
      this.showError = false;
    }, 4000);
  }
}
