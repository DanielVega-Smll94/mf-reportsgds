import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() animationEvent!: string;


  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.animationEvent = this.animationEvent ?? 'ball-clip-rotate-multiple'
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

}
