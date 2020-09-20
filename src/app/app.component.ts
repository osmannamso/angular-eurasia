import {Component, OnDestroy, OnInit} from '@angular/core';
import {Review} from './shared/interfaces/review';
import {ReviewService} from './services/review.service';
import {ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  reviewForm: FormGroup;
  reviews: Array<Review> = [];
  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor(private reviewService: ReviewService) {}


  ngOnInit(): void {
    this.reviewForm = this.reviewService.getReviewForm();
    this.reviewService.getReviews()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.reviews = data;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  submit(): void {
    this.reviews.push(this.reviewForm.getRawValue());
    this.reviewForm = this.reviewService.getReviewForm();
  }
}
