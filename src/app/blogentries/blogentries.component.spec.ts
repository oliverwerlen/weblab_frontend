import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogentriesComponent } from './blogentries.component';

describe('BlogentriesComponent', () => {
  let component: BlogentriesComponent;
  let fixture: ComponentFixture<BlogentriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogentriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogentriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
