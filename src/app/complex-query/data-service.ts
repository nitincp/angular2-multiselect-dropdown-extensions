import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { map, distinctUntilChanged, shareReplay, switchMap, switchMapTo, tap, concatMap, mergeMap, filter } from 'rxjs/operators';
import { MasterData, Record } from './complex-query.component';
import * as faker from 'faker';
import { FormControl } from '@angular/forms';
import { concat, merge } from 'rxjs';

export function getAngularMultiSelectOnCloseValue(control: AngularMultiSelect) {
  return control.onClose.pipe(map(() => control.selectedItems), distinctUntilChanged(), shareReplay(1));
}
export function getOnManualValueChanged(component: AngularMultiSelect, control: FormControl) {
  
  // const onOpen$ = component.onOpen; //.pipe(tap(() => console.log('open complete')));
  const onClose$ = component.onClose; //.pipe(tap(() => console.log('close complete')));
  const onDeSelect$ = component.onDeSelect.pipe(
    filter(() => component.isActive == false)
  );

  return merge(
    onClose$, onDeSelect$
  ).pipe(
    map(() => component.selectedItems.slice()),
    distinctUntilChanged((x, y) => {
      const getKey = (item: any) => item[component.settings.primaryKey];
      const xjson = JSON.stringify(x.map(getKey).sort());
      const yjson = JSON.stringify(y.map(getKey).sort());
      // console.log('json compare', xjson, yjson);
      return  xjson == yjson;
    })
  );
}
export function getData(masterData: MasterData) {
  const data: Record[] = [];
  for (let idx = 0; idx < 3000; idx++) {
    const element: Record = {
      company: faker.random.arrayElement(masterData.companies).itemName,
      division: faker.random.arrayElement(masterData.divisions).itemName,
      industry: faker.random.arrayElement(masterData.industries).itemName,
      city: faker.random.arrayElement(masterData.cities).itemName
    };
    data.push(element);
  }
  return data;
}
export function getMasterData() {
  const masterData: MasterData = {
    companies: [],
    divisions: [],
    industries: [],
    cities: []
  };
  for (let idx = 0; idx < 20; idx++) {
    const element = { id: idx, itemName: faker.company.companyName() };
    masterData.companies.push(element);
  }
  for (let idx = 0; idx < 40; idx++) {
    const element = { id: idx, itemName: faker.company.bs() };
    masterData.divisions.push(element);
  }
  for (let idx = 0; idx < 20; idx++) {
    const element = { id: idx, itemName: faker.finance.accountName() };
    masterData.industries.push(element);
  }
  for (let idx = 0; idx < 20; idx++) {
    const element = { id: idx, itemName: faker.address.city() };
    masterData.cities.push(element);
  }
  return masterData;
}
export function getFilteredMasterData(data: Record[], masterData: MasterData): MasterData {
  return {
    companies: data.map(x => x.company).filter(onlyUnique).map(x => masterData.companies.find(c => x == c.itemName)),
    cities: data.map(x => x.city).filter(onlyUnique).map(x => masterData.cities.find(c => x == c.itemName)),
    divisions: data.map(x => x.division).filter(onlyUnique).map(x => masterData.divisions.find(c => x == c.itemName)),
    industries: data.map(x => x.industry).filter(onlyUnique).map(x => masterData.industries.find(c => x == c.itemName))
  };
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
