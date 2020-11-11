import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFollowUsersPage } from './modal-follow-users.page';

describe('ModalFollowUsersPage', () => {
  let component: ModalFollowUsersPage;
  let fixture: ComponentFixture<ModalFollowUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFollowUsersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFollowUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
