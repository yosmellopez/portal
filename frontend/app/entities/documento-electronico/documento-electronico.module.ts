import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortalSharedModule } from 'app/shared/shared.module';
import { DocumentoElectronicoComponent } from './documento-electronico.component';
import { DocumentoElectronicoDetailComponent } from './documento-electronico-detail.component';
import { documentoElectronicoRoute } from './documento-electronico.route';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';

const ENTITY_STATES = [...documentoElectronicoRoute];

@NgModule({
    imports: [PortalSharedModule, MatTableExporterModule, RouterModule.forChild(ENTITY_STATES), PDFExportModule],
    declarations: [
        DocumentoElectronicoComponent,
        DocumentoElectronicoDetailComponent
    ],
    entryComponents: [
        DocumentoElectronicoComponent
    ]
})
export class PortalDocumentoElectronicoModule {
}
