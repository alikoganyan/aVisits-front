import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'jsDateToTimeString'
})
export class JsDateToTimeStringPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return `${value.getHours()}:${value.getMinutes()}`;
    }

}
