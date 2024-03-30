import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailDirective } from './validators/email.directive';
import { DisplayDatePipe } from './pipes/display-date.pipe';
import { SlicePipe } from './pipes/slice.pipe';

@NgModule({
  declarations: [LoaderComponent, EmailDirective, DisplayDatePipe, SlicePipe],
  imports: [CommonModule],
  exports: [LoaderComponent, EmailDirective, DisplayDatePipe, SlicePipe],
})
export class SharedModule {}
