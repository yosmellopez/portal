import {Pipe, PipeTransform} from "@angular/core";
import {ConfigService} from "app/shared/config-service";

@Pipe({
    name: 'configure',
    pure: false
})
export class ConfigPipe implements PipeTransform {
    constructor(private configService: ConfigService) {
    }

    transform(key: any, ...args: any[]): any {
        if (key) {
            return this.configService.getValueFromKey(key);
        }
        return '';
    }
}