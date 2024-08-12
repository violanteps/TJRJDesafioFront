import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorLivroListComponent } from './valor-livro-list.component';

describe('ValorLivroListComponent', () => {
  let component: ValorLivroListComponent;
  let fixture: ComponentFixture<ValorLivroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorLivroListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorLivroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
