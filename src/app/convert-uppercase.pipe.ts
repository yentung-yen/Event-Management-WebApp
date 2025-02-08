import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUppercase'
})
export class ConvertUppercasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    
    if (value) {
      return value.toUpperCase();
    }
    return value;
  }
}
