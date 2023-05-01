import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  withoutSpace(evt: any) {
    let key = (evt.which) ? evt.which : evt.keyCode
    return (key != 32)
  }

}