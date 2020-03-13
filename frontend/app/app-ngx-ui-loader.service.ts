import {Injectable} from '@angular/core';
import {NgxUiLoaderConfig, NgxUiLoaderService} from 'ngx-ui-loader';

@Injectable()
export class AppNgxUiLoaderService {
    config: NgxUiLoaderConfig;

    /**
     * Constructor
     * @param ngxUiLoaderService
     */
    constructor(private ngxUiLoaderService: NgxUiLoaderService) {
        this.config = this.ngxUiLoaderService.getDefaultConfig();
    }
}
