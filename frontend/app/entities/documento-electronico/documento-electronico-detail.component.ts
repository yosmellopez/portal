import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentoElectronico } from 'app/shared/model/documento-electronico.model';

@Component({
  selector: 'jhi-documento-electronico-detail',
  templateUrl: './documento-electronico-detail.component.html'
})
export class DocumentoElectronicoDetailComponent implements OnInit {
  documentoElectronico: IDocumentoElectronico;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ documentoElectronico }) => {
      this.documentoElectronico = documentoElectronico;
    });
  }

  previousState() {
    window.history.back();
  }
}
