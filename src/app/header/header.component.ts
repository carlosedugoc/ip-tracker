import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMap } from '../map/map.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public form: FormGroup;

  @Output()
  ipToSearch = new EventEmitter<string>();
  @Input() location: IMap;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      search: ['', Validators.required],
    });
  }

  get search() {
    return this.form.get('search');
  }

  submitForm() {
    this.search.markAsTouched();
    this.search.markAsDirty();
    if (this.form.valid) {
      this.ipToSearch.emit(this.search.value);
    } else {
      console.log(this.form);
    }
  }

  ngOnInit(): void {}
}
