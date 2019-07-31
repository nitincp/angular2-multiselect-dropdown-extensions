import { Component, OnInit, ContentChild, ViewChild } from '@angular/core';
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit {

  itemList = [];
  selectedItems = [];
  dropdownSettings: Partial<DropdownSettings>;
  userForm: FormGroup;

  @ViewChild('skillsEle') skillsEle: AngularMultiSelect;
  
  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get skills() {
    return this.userForm.get('skills')
  }

  get acceptTerms() {
    return this.userForm.get('acceptTerms');
  }

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      skills: [[], [Validators.required, Validators.minLength(3)]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      updateOn: "blur"
    });

    
  }
  ngOnInit() {
    this.skillsEle.onClose.pipe(
      map(() => {
        return this.skills.value
      }),
      tap(value => {
        console.log('new value', value);
      })
    ).subscribe();
    
    this.itemList = [
      { "id": 1, "itemName": "India" },
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" },
      { "id": 5, "itemName": "South Korea" },
      { "id": 6, "itemName": "Germany" },
      { "id": 7, "itemName": "France" },
      { "id": 8, "itemName": "Russia" },
      { "id": 9, "itemName": "Italy" },
      { "id": 10, "itemName": "Sweden" }
    ];
    this.selectedItems = [
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" },
      { "id": 5, "itemName": "South Korea" }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      enableSearchFilter: true,
      primaryKey: 'id'
    };
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
  onOpen(param: any) {
    console.log('on open', param)
  }

  onClose(param: any) {
    console.log('on close', param)
  }

}
