import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GenericEventsComponent } from './generic-events.component';
import { GenericEventsDetailComponent } from './generic-event/generic-event-detail/generic-events-detail.component';
import { HttpClientModule } from '@angular/common/http';

// Swiper imports
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MaterialModule } from '../../material-module';
import { GenericEventsCardComponent } from './generic-event/generic-event-card/generic-events-card.component';
import { GenericEventsThumbnailComponent } from './generic-event/generic-event-thumbnail/generic-events-thumbnail.component';
import { GenericEventComponent } from './generic-event/generic-event.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 30,
  freeMode: false,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  }
};

@NgModule({
  declarations: [
    GenericEventsComponent,
    GenericEventComponent,
    GenericEventsCardComponent,
    GenericEventsThumbnailComponent,
    GenericEventsDetailComponent
  ],
  imports: [
    MaterialModule,
    SwiperModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  entryComponents: [
    GenericEventsComponent,
    GenericEventComponent,
    GenericEventsCardComponent,
    GenericEventsThumbnailComponent,
    GenericEventsDetailComponent
  ],
  exports: [
    GenericEventsComponent,
    GenericEventComponent,
    GenericEventsCardComponent,
    GenericEventsThumbnailComponent
  ]
})
export class GenericEventsModule { }
