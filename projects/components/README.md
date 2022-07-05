 # 基本使用

## 在需要使用的module模块下引入
```JavaScript 
  import { EleEditModule } from 'angular-richedit';
```
## 对应 component.html
```JavaScript
  <ng-ele-richEdit [editOption]="editOption" (onSaving)="onSaveing($event)" (onSave)="onSave($event)">
    </ng-ele-richEdit>
```
## 对应 component.ts(测试数据，最终数据以真实性为准)
```JavaScript
 editOption: OptionsEx = {
    width: '1200px',
    type: DocumentFormat.Rtf,
    isShowCode: false,
    patientMedicalList:[
      {
        medicalId: "1",
        medicalName: "第一次病历",
        createtime: "2011-04-24"
      },
      {
        medicalId: "2",
        medicalName: "第二次病历",
        createtime: "2015-04-24"
      },
      {
        medicalId: "3",
        medicalName: "第三次病历",
        createtime: "2022-04-24"
      }
    ],
    richEditValueData: [
      {
        id: '123',
        value: '张三'
      },
      {
        id: '12345',
        value: '李四'
      },
      {
        id:'01802237-b64c-4330-8010-1b28c1568956',
        value:'我自己测试的医院'
      }
    ],
    height: '900px',
     elementList: [
      {
        name: '门诊相关',
        id: 'string',
        children: [
          {
            id: "123",
            name: '患者姓名',
          },
          {
            id: '1234',
            name: '患者年龄',
          },
        ],
      },
      {
        name: '住院',
        children: [{
          id: '12345',
          name: '住院时间'
        }, {
          id: '123456',
          name: '住院日期'
        }],
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
    
  }
  onSaveing(info: any) {
  
  }
```
> ## OptionsEx 属性  

  | 属性               | 类型            | 描述/列举值                                                   |
  | ------------------ | --------------- | -------------------------------------------------------------|
  | width              | string         | 宽度 "100px"                                                  |
  | hegiht             | string         | 高度 "90px"                                                   |
  | documentContent    | 'File'丨'Blob'丨'ArrayBuffer'丨'string(base64)'        | 文件信息 |
  | type     |  DocumentFormat        | 文件类型                                           |
  | elementList        | ElementItem[]   | 左边要素信息 |
  | isShowCode         | bool                 | 是否显示代码-用户进行一开始进去呈现代码值还是对应的真实数据值 |
  | patientMedicalList | PMItem[]        | 患者历史病历列表  |
  | richEditValueData  | EditValueItem[] | 患者病历模板字段对应显示值 |
  | openDocument | ((documentContent: 'File'丨'Blob'丨'ArrayBuffer'丨'string(base64)' , type: DocumentFormat) => void) | 打开模板文件 |

> ## 方法  
| 方法名    | 类型                | 描述/列举值 |
| --------- | ------------------- | ----------- |
| onSave    | (v: SaveFiles) => void | 文件保存前调用  |
| onSaveing | (v: RichEdit)  =>void | 文件保存后调用(目前不实现)  |
|onPatientmedicaldbClick|(v:PMItem) => void |左边患者病历双击事件 |
#  设置样式

## 引用了antd组件和dev_richedit组件
```javascript
"styles": [
          "src/styles.css",
          "./node_modules/ng-zorro-antd/ng-zorro-antd.min.css",
          "./node_modules/devextreme/dist/css/dx.light.css",
          "./node_modules/devexpress-richedit/dist/dx.richedit.css"
          ],
"assets": [
              {
                "glob": "**/*",
                "input": "./node_modules/@ant-design/icons-angular/src/inline-svg/",
                "output": "/assets/"
              }
            ],

```
