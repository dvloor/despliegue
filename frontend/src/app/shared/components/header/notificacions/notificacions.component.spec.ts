import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionsComponent } from './notificacions.component';

describe('NotificacionsComponent', () => {
  let component: NotificacionsComponent;
  let fixture: ComponentFixture<NotificacionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
