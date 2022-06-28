import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EleEditComponent } from './lib/eleEdit.component';
import { NzButtonModule} from 'ng-zorro-antd/button';
@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EleEditComponent],
  imports: [NzButtonModule],
  exports: [EleEditComponent],
})
export class EleEditModule {}
