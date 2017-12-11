import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'imageSrc'
})
export class ImageSrcPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if(value) {
            return `http://api.avisits.com/${value}`;
        }
        return '';
    }

}
