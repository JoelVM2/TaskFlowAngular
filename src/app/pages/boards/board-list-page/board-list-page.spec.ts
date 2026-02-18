import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListPage } from './board-list-page';

describe('BoardListPage', () => {
  let component: BoardListPage;
  let fixture: ComponentFixture<BoardListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
