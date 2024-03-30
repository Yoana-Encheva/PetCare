import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
})
export class SlicePipe implements PipeTransform {
  transform(value: string, maxLength = 150): string {
    return `${value && value.substring(0, maxLength)}${
      value?.length > maxLength ? '...' : ''
    }`;
  }
}
