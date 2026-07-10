import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddEditFolderModalComponent } from "./add-edit-folder-modal.component";
import { TranslateModule } from "@ngx-translate/core";
import { FoldersFormService } from "@services/folders-form/folders-form.service";
import { ModalService } from "@services/modal/modal.service";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("AddEditFolderModalComponent", () => {
	let component: AddEditFolderModalComponent;
	let fixture: ComponentFixture<AddEditFolderModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AddEditFolderModalComponent, TranslateModule.forRoot(), ReactiveFormsModule, HttpClientTestingModule],
			providers: [FoldersFormService, ModalService]
		}).compileComponents();

		fixture = TestBed.createComponent(AddEditFolderModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
