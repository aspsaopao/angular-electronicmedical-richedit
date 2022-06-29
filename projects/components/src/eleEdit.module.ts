import { EleEditComponent } from './lib/eleEdit.component';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import {
  NzIconModule,
  NZ_ICON_DEFAULT_TWOTONE_COLOR,
  NZ_ICONS,
} from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzGridModule,
    NzTabsModule,
    NzTreeViewModule,
    NzTreeModule,
    NzIconModule
  ],
  providers: [
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [EleEditComponent],
  declarations: [EleEditComponent],
})
export class EleEditModule { }
