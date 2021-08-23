import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() public idModal;

  constructor() { }

  ngOnInit(): void {
  }

  public show() {
    (document.getElementById(`openModalButton${this.idModal}`) as HTMLElement).click();
  }

  public dissmis() {
    (document.getElementById(`closeModalButton${this.idModal}`) as HTMLElement).click();
  }

}
