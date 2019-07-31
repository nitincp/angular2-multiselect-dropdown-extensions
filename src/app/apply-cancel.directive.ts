import { Directive, Host, Optional, HostListener, Renderer2, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';

@Directive({
  selector: '[appApplyCancel]'
})
export class ApplyCancelDirective implements OnInit, OnDestroy {

  private isCancelled = true;
  private selectedtemsOnOpen: any[];
  applyClickUnlisten: () => void;
  cancelClickUnlisten: () => void;
  applyBtn: HTMLButtonElement;
  cancelBtn: HTMLButtonElement;
  selectionChangedSub: Subscription;;
  @HostListener('onClose', [])
  onClose() {
    if (this.isCancelled) {
      this.host.selectedItems = this.selectedtemsOnOpen;
    }
    if (this.compareSelectedItems(this.host.selectedItems, this.selectedtemsOnOpen) == false) {
      this.selectionChanged.emit(this.host.selectedItems.slice());
    }
    this.isCancelled = true;
    this.selectedtemsOnOpen = null;
  }

  @HostListener('onOpen', [])
  onOpen() {
    this.isCancelled = true;
    this.selectedtemsOnOpen = this.host.selectedItems.slice();
  }

  @HostListener('onDeSelect', [])
  onDeselect() {
    if (this.host.isActive == false) {
      this.selectionChanged.emit(this.host.selectedItems.slice());
    }
  }

  @Output('appApplyCancelSelectionChanged')
  selectionChanged = new EventEmitter<any[]>()

  constructor(@Host() @Optional() private host: AngularMultiSelect, private renderer: Renderer2) { }

  ngOnInit() {

    // if (!this.host.selectedItems) {
    //   this.host.selectedItems = [];
    // }

    this.applyBtn = (this.renderer.createElement('button') as HTMLButtonElement);
    this.applyBtn.type = 'button';
    this.applyBtn.textContent = 'apply';
    this.applyClickUnlisten = this.renderer.listen(this.applyBtn, 'click', () => {
      this.isCancelled = false;
      this.host.closeDropdown();
    });

    this.cancelBtn = this.renderer.createElement('button') as HTMLButtonElement;
    this.cancelBtn.type = 'button';
    this.cancelBtn.textContent = 'cancel';
    this.cancelClickUnlisten = this.renderer.listen(this.cancelBtn, 'click', () => {
      this.host.closeDropdown();
    })

    const dropdownListElem = this.host.dropdownListElem.nativeElement as HTMLElement;
    this.renderer.insertBefore(dropdownListElem, this.applyBtn, dropdownListElem.children[0]);
    this.renderer.insertBefore(dropdownListElem, this.cancelBtn, dropdownListElem.children[1]);

    // this.selectionChangedSub = getOnManualSelectionChanged(this.host).subscribe(newValue => {
    //   this.selectionChanged.emit(newValue)
    // })
  }

  compareSelectedItems(x: any[], y: any[]) {
    const getKey = (item: any) => item[this.host.settings.primaryKey];
    const xjson = JSON.stringify(x.map(getKey).sort());
    const yjson = JSON.stringify(y.map(getKey).sort());
    // console.log('json compare', xjson, yjson);
    return xjson == yjson;
  }

  ngOnDestroy() {

    this.applyClickUnlisten()
    this.renderer.destroyNode(this.applyBtn);

    this.cancelClickUnlisten();
    this.renderer.destroyNode(this.cancelBtn);

    // this.selectionChangedSub.unsubscribe();
  }
}

function getOnManualSelectionChanged(component: AngularMultiSelect) {

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
      return xjson == yjson;
    })
  );
}
