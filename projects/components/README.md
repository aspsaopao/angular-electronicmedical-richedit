 # 基本使用

## 在需要使用的module模块下引入
```JavaScript 
  import { EleEditModule } from 'angular-richedit';
```
## 对应 component.html
```JavaScript
  <ng-ele-richEdit [editOption]="editOption" (onSaving)="onSaving($event)" (onSave)="onSave($event)">
    </ng-ele-richEdit>
```
## 对应 component.ts
```JavaScript
 editOption: OptionsEx = {
    width: '1200px',
    isShowCode: true,
    height: '900px',
    elementList: [
      {
        name: '门诊相关',
        id: 'string',
        children: [
          {
            name: '患者姓名',
          },
          {
            name: '患者年龄',
          },
        ],
      },
      {
        name: '住院',
        children: [{ name: '住院时间' }, { name: 'l住院日期eaf' }],
      },
    ],
    documentBase64:
      'e1xydGYxXGRlZmYwe1xmb250dGJse1xmMCBDYWxpYnJpO319e1xjb2xvcnRibCA7XHJlZDB' +
      'cZ3JlZW4wXGJsdWUyNTUgO1xyZWQyNTVcZ3JlZW4yNTVcYmx1ZTI1NSA7fXtcKlxkZWZjaHAgXGZzMjJ9e1xzdHl' +
      'sZXNoZWV0IHtccWxcZnMyMiBOb3JtYWw7fXtcKlxjczFcZnMyMiBEZWZhdWx0IFBhcmFncmFwaCBGb250O317XCp' +
      'cY3MyXGZzMjJcY2YxIEh5cGVybGluazt9e1wqXHRzM1x0c3Jvd2RcZnMyMlxxbFx0c3ZlcnRhbHRcdHNjZWxsY2J' +
      'wYXQyXHRzY2VsbHBjdDBcY2x0eGxydGIgTm9ybWFsIFRhYmxlO319e1wqXGxpc3RvdmVycmlkZXRhYmxlfXtcaW5' +
      'mb31cbm91aWNvbXBhdFxzcGx5dHduaW5lXGh0bWF1dHNwXGV4cHNocnRuXHNwbHRwZ3BhclxkZWZ0YWI3MjBcc2V' +
      'jdGRcbWFyZ2xzeG4xNDQwXG1hcmdyc3huMTQ0MFxtYXJndHN4bjE0NDBcbWFyZ2JzeG4xNDQwXGhlYWRlcnk3MjB' +
      'cZm9vdGVyeTcyMFxwZ3dzeG4xMjI0MFxwZ2hzeG4xNTg0MFxjb2xzMVxjb2xzeDcyMFxwYXJkXHBsYWluXHFse1x' +
      'mczIyXGNmMFxjczEgRG9jdW1lbnQgdGV4dH1cZnMyMlxjZjBccGFyfQ==',
  };
  onSave(info: any) {
    console.log(111, info);
  }
  onSaving(info: any) {
    console.log(222, info);
  }
```
> ## 属性  

  属性   | 类型   | 描述/列举值
 ----    | -----  | ------  
 width   | string | 宽度 "100px"
 hegiht  | string | 高度 "90px"
 documentBase64  | string | 文件信息base64编码
 elementList  | ElementItem[] | 左边要素信息
 isShowCode  | bool | 是否显示代码-用户进行一开始进去呈现代码值还是对应的真实数据值 
 patientMedicalList  | PMItem[]  | 患者历史病历列表
 richEditValueData  | EditValueItem[] | 患者病历模板字段对应显示值
> ## 方法  
方法名   | 类型   | 描述/列举值
 ----    | -----  | ------  
 onSave   | (v: RichEdit): void | 文件保存前
 onSaveing   | (v: RichEdit): void | 文件保存后

#  设置样式

## 引用了antd组件和dev_richedit组件
```javascript
"styles": [
          "src/styles.css",
          "./node_modules/ng-zorro-antd/ng-zorro-antd.min.css",
          "./node_modules/devextreme/dist/css/dx.light.css",
          "./node_modules/devexpress-richedit/dist/dx.richedit.css"
          ],
```