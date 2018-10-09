import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class KdiIconRegistry  extends MatIconRegistry{

  constructor( _http: HttpClient, _sanitizer: DomSanitizer) { 
    super (_http, _sanitizer, null);
    this.registerFontClassAlias('fontawesome', 'fa');
  }

}
