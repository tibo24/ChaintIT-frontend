import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeResourcePipe'
})
export class RemoveResourcePipe implements PipeTransform {
  transform(resource: string): any {
   return /[^#]*$/.exec(resource)[0]
  }
}