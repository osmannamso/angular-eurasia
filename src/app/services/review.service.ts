import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Review} from '../shared/interfaces/review';
import {CustomHttpService} from './custom-http.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(
    private http: CustomHttpService,
    private fb: FormBuilder
  ) {}

  getReviewForm(): FormGroup {
    return this.fb.group({
      clientName: '',
      review: ''
    });
  }

  getReviews(): Observable<Array<Review>> {
    return this.http.get('/assets/reviews.json');
  }
}
