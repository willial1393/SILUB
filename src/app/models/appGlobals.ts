import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppGlobals {
  base_url = 'http://localhost/api/public/silub/';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
}
