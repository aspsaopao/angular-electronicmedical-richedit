 # 基本使用

引入
```JavaScript 
  import { EleEditModule } from 'angular-richedit';
```
使用
```JavaScript
  <ng-ele-richEdit [editOption]="editOption" (onSaving)="onSaving($event)" (onSave)="onSave($event)">
    </ng-ele-richEdit>
```

  > 方法
  >> onSave=>文件保存前
  >>>
  >> onSaveing=>文件保存后 
  >>>
  > 属性
  >>>
  >> editOption 电子病历配置信息
  >>>
  >>> width string 宽度 "100px"
  >>>
  >>> hegiht string 高度 "90px"
  >>>
  >>> documentBase64 string  文件信息
  >>>
  >>> elementOue  ElementItem[] 左边要素信息
  >>>
  >>> patientMedicalList PMItem[] 患者历史病历列表 

#  设置样式

 引用了antd组件和dev_richedit组件
```javascript
"styles": [
          "src/styles.css",
          "./node_modules/ng-zorro-antd/ng-zorro-antd.min.css",
          "./node_modules/devextreme/dist/css/dx.light.css",
          "./node_modules/devexpress-richedit/dist/dx.richedit.css"
          ],
```