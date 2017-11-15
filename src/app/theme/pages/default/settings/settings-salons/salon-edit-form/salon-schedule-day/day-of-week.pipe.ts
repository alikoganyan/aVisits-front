import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {
    days = ['', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    transform(value: any, args?: any): any {
        return this.days[value];
    }

}
