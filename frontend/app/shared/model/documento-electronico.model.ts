import {ICliente} from "app/shared/model/cliente.model";
import {Moment} from "moment";

export interface IDocumentoElectronico {
    idDocumento?: number;
    numSerie?: string;
    nombre?: string;
    fecEmisionDoc?: Moment;
    tipoDoc?: string;
    tipoTransaccion?: string;
    total?: number;
    docPdf?: string;
    docXml?: string;
    docCdr?: string;
    rucClient?: string;
    estadoSunat?: string;
    estadoWeb?: string;
    monedaTransaccion?: string;
    cliente?: ICliente
}

export class DocumentoElectronico implements IDocumentoElectronico {
    constructor(
        public idDocumento?: number,
        public numSerie?: string,
        public nombre?: string,
        public fechaEmision?: Moment,
        public tipoDocumento?: string,
        public tipoTransaccion?: string,
        public total?: number,
        public docPdf?: string,
        public docXml?: string,
        public docCdr?: string,
        public rucClient?: string,
        public estadoSunat?: string,
        public estadoWeb?: string,
        public monedaTransaccion?: string,
        public cliente?: ICliente
    ) {
    }
}

export class TipoDocumento {

    constructor(public tipo?: string, public title?: string) {
    }
}
