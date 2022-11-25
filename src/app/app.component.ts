import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  factorialResult: number;
  form: FormGroup;
  list: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      factorial: 0
    });

    this.factorialResult = this.form.get('factorial').value;
  }

  calculateFactorial() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      const value = this.form.get('factorial')?.value || 0;

      worker.onmessage = ({ data }) => {
        // this.factorialResult = data;
        this.list = data;
      };
      worker.postMessage('request');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}
