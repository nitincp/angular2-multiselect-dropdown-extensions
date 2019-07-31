import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { merge } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { getMasterData, getData, getFilteredMasterData, getAngularMultiSelectOnCloseValue, getOnManualValueChanged } from './data-service';

export type Record = {
  company: string,
  division: string,
  industry: string,
  city: string
}
type MasterRecord = {
  id: number,
  itemName: string
}
export type MasterData = {
  companies: MasterRecord[];
  divisions: MasterRecord[];
  industries: MasterRecord[];
  cities: MasterRecord[];
};


@Component({
  selector: 'app-complex-query',
  templateUrl: './complex-query.component.html',
  styleUrls: ['./complex-query.component.scss']
})
export class ComplexQueryComponent implements OnInit {

  dropdownSettings: Partial<DropdownSettings>;

  masterData: MasterData;
  data: Record[];
  querySelectionForm: FormGroup;
  filteredMasterData: MasterData;

  @ViewChild('companiesEle') companiesEle: AngularMultiSelect;
  @ViewChild('divisionsEle') divisionsEle: AngularMultiSelect;
  @ViewChild('citiesEle') citiesEle: AngularMultiSelect;
  @ViewChild('industriesEle') industriesEle: AngularMultiSelect;
  
  get companies() {
    return this.querySelectionForm.get('companies') as FormControl;
  }

  get divisions() {
    return this.querySelectionForm.get('divisions');
  }

  get cities() {
    return this.querySelectionForm.get('cities');
  }

  get industries() {
    return this.querySelectionForm.get('industries');
  }

  constructor(private fb: FormBuilder) {
    
    this.querySelectionForm = this.fb.group({
      companies: [[]],
      divisions: [[]],
      cities: [[]],
      industries: [[]]    
    });
  }

  ngOnInit() {

    this.masterData = getMasterData();
    this.data = getData(this.masterData);
    this.filteredMasterData = getFilteredMasterData(this.data, this.masterData);

    console.log('on init', this);

    // getOnManualValueChanged(this.companiesEle, this.companies).subscribe(value => {
    //   console.log('companies new value', value);
    // });
    
    // merge(
    //   getAngularMultiSelectOnCloseValue(this.companiesEle),
    //   getAngularMultiSelectOnCloseValue(this.divisionsEle),
    //   getAngularMultiSelectOnCloseValue(this.citiesEle),
    //   getAngularMultiSelectOnCloseValue(this.industriesEle)
    // ).pipe(
    //   map((value) => {
    //     console.log('some value changed', value);
    //     return {
    //       companies: this.companies.value,
    //       divisions: this.divisions.value,
    //       cities: this.cities.value,
    //       industries: this.industries.value
    //     }
    //   }),
    //   distinctUntilChanged(),
    //   tap(value => {
    //     console.log('value', value);
    //   })
    // ).subscribe()
  }

  onApplyCancelSelectionChanged(listName: string, item: MasterRecord[]) {
    console.log(listName, 'onApplyCancelSelectionChanged', item);
  }

  onItemSelect(listName: string, item: MasterRecord) {
    console.log(listName, 'onItemSelect', item);
  }
  OnItemDeSelect(listName: string, item: MasterRecord) {
    console.log(listName, 'onItemDeselect', item);
  }
  onSelectAll(listName: string, items: MasterRecord[]) {
    console.log(listName, 'onSelectAll', items);
  }
  onDeSelectAll(listName: string, items: MasterRecord) {
    console.log(listName, 'onDeSelectAll', items);
  }
  onOpen(listName: string, param: boolean) {
    console.log(listName, 'onOpen', param)
  }
  onClose(listName: string, param: boolean) {
    console.log(listName, 'onClose', param)
  }
  onSubmitted(event: any, query: any) {
    console.log('onSubmitted', query, event);
  }
}


