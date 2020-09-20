import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {
  constructor(
    private http: HttpClient
  ) {}

  get(uri: string, data: any = {}): Observable<any> {
    return this.http.get(`${uri}`, {params: data});
  }
}
