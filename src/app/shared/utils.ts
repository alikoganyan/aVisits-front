import _ = require("lodash");

export class Utils {
    public static transformImgOnSave(obj: any): any {
        return _.cloneDeep({
            ...obj,
            img: Utils.getImageName(obj.img)
        });
    }

    static getImageName(img: string): string {
        return img.split('/').pop();
    }
}