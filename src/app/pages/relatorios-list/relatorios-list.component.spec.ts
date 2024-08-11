import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosListComponent } from './relatorios-list.component';

describe('RelatoriosListComponent', () => {
  let component: RelatoriosListComponent;
  let fixture: ComponentFixture<RelatoriosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatoriosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoriosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
