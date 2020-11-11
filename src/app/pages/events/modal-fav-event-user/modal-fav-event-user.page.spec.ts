import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFavEventUserPage } from './modal-fav-event-user.page';

describe('ModalFavEventUserPage', () => {
  let component: ModalFavEventUserPage;
  let fixture: ComponentFixture<ModalFavEventUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFavEventUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFavEventUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
