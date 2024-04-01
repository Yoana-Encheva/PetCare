import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
@Pipe({
  name: 'displayDate',
})
export class DisplayDatePipe implements PipeTransform {
  transform(date: number, ...args: unknown[]): unknown {
    return date && formatDate(date, 'dd.MM.yy, h:mm a', 'en-US');
  }
}
