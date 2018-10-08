import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppGlobals {
  base_url = 'http://localhost/SILUB/api/public/';
  // base_url = 'https://kitsune1393.000webhostapp.com/SILUB/api/public/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

}
