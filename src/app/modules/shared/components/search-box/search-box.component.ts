import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  private debouncerSubscription?: Subscription;

  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Output()
  public onDebounce = new EventEmitter<string>();

  @Input()
  public initialValue: string = '';

  onKeyPress(searchTerm: string) {
    return this.debouncer.next(searchTerm);
  }

}
