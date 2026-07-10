import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from "@ngx-translate/core";
import { FolderListItemComponent } from './folder-list-item.component';
import { IFolder } from "../../../../types/folder.interface";

describe('FolderListItemComponent', () => {
  let component: FolderListItemComponent;
  let fixture: ComponentFixture<FolderListItemComponent>;
  const mockFolder: IFolder = {
    id: 1,
    name: 'Test Folder',
    description: 'Test Description',
    wordIds: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderListItemComponent],
      providers: [provideTranslateService()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolderListItemComponent);
    component = fixture.componentInstance;
    component.folder = mockFolder;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
