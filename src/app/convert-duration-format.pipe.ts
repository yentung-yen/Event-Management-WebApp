import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDurationFormat'
})
export class ConvertDurationFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let newValue = "";

    if (value >= 60) {
      let minutes = value % 60;

      if (minutes == 0){
        newValue = `${value/60} hours(s)`
      } else {
        newValue = `${Math.floor(value/60)} hour(s) ${minutes} minute(s)`
      }
    } else {
      newValue = `${value} minute(s)`
    }
    return newValue
  }

}
