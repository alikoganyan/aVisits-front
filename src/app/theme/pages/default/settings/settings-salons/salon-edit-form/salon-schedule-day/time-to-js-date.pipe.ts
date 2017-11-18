import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timeToJsDate'
})
export class TimeToJsDatePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let t = value.split(":");
        let h = t[0],
            m = t[1],
            s = 0,
            ms = (new Date()).setHours(h, m, s);

        return new Date(ms);
    }

}
