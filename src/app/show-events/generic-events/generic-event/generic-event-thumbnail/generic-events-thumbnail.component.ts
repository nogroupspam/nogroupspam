import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDate } from '../../../../shared/localdate/model/localdate';
import { DateUtils } from '../../../../shared/localdate/date-utils';
import { STATE } from '../../../../app-state';
import { GenericEvent } from '../../../../shared/models/events/event/generic/genericEvent';

@Component({
  selector: 'app-generic-events-thumbnail',
  templateUrl: './generic-events-thumbnail.component.html',
  styleUrls: ['./generic-events-thumbnail.component.scss']
})
export class GenericEventsThumbnailComponent implements OnInit {
  @Input()
  idDay: string;
  @Input()
  event: GenericEvent;

  constructor(private router: Router) { }

  ngOnInit() { }

  length(object: object): number {
    if (object) {
      return Object.keys(object).length;
    } else {
      return 0;
    }
  }

  showDate(date: LocalDate): string {
    return new DateUtils().showDate(date);
  }

  openDetails(): void {
    STATE.setArgs({
      idDay: this.idDay,
      event: this.event
    });
    this.router.navigate(['eventos/' + this.idDay + '/' + this.event.id]);
  }
}
