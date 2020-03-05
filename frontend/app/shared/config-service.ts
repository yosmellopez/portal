import {EventEmitter, Inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Inject({provideIn: 'root'})
export class ConfigService {
    data: any = {};
    languageEmitter: EventEmitter<boolean> = new EventEmitter();

    constructor(private http: HttpClient) {
        this.use();
    }

    use(): Promise<{}> {
        return new Promise<{}>((resolve, reject) => {
            const langPath = `content/config/config.json`;
            return this.http.get<{}>(langPath).subscribe(
                translation => {
                    this.data = Object.assign({}, translation || {});
                    resolve(this.data);
                },
                error => {
                    console.log(error);
                    this.data = {};
                    resolve(this.data);
                }
            );
        });
    }

    getValueFromKey(key: string) {
        const split: any[] = key.split('.');
        let currentObject: any = null;
        split.forEach(string => {
            if (!currentObject) {
                currentObject = this.data[string];
            } else {
                currentObject = currentObject[string];
            }
        });
        return currentObject || key;
    }
}