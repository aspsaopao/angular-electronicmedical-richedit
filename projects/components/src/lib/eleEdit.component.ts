import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  create,
  createOptions,
  DocumentFormat,
  PrintMode,
  RibbonTabType,
  ParagraphAlignment,
  RichEdit,
} from 'devexpress-richedit';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import { ElementItem, FlatNode, OptionsEx, FlatNodeEx, SaveFiles } from '../eleeditintarface';


@Component({
  selector: 'ng-ele-richEdit',
  templateUrl: './eleEdit.component.html',
  styleUrls: ['./eleEdit.component.css'],
})
export class EleEditComponent implements OnInit {
  /**
   * 配置信息
   */
  @Input() editOption: OptionsEx = null;
  /**
   * 文件保存事件传出
   */
  @Output() onSave = new EventEmitter<SaveFiles>();
  @Output() onSaving = new EventEmitter<RichEdit>();

  private rich!: RichEdit;

  ngOnInit() { }

  constructor() { }
  openFileDialogOnClick = true;

  ngAfterViewInit(): void {
    this.fieids = [];
    const options = createOptions();
    options.ribbon.removeTab(RibbonTabType.Home);
    options.ribbon.removeTab(RibbonTabType.File);
    options.ribbon.removeTab(RibbonTabType.Insert);
    options.ribbon.removeTab(RibbonTabType.PageLayout);
    options.ribbon.removeTab(RibbonTabType.MailMerge);
    options.ribbon.removeTab(RibbonTabType.View);
    options.ribbon.removeTab(RibbonTabType.References);
    options.ribbon.visible = false;

    // events
    options.events.activeSubDocumentChanged = () => { };
    options.events.autoCorrect = () => { };

    options.events.characterPropertiesChanged = () => { };
    options.events.contentInserted = () => { };
    options.events.contentRemoved = () => { };
    options.events.documentChanged = () => { };
    options.events.documentFormatted = () => { };
    options.events.documentLoaded = () => { };
    options.events.gotFocus = () => { };
    options.events.hyperlinkClick = () => { };
    options.events.keyDown = () => { };
    options.events.keyUp = () => { };
    options.events.paragraphPropertiesChanged = () => { };
    options.events.lostFocus = () => { };
    options.events.pointerDown = () => { };
    options.events.pointerUp = () => { };
    options.events.saving = (s: RichEdit) => {

      this.rich.document.fields.updateAllFields(() => { });

      s.exportToFile(t => {
        this.onSave.emit({
          file: t,
          fileIds: this.fieids
        });
      }, DocumentFormat.OpenXml)
    };
    options.events.saved = (s: RichEdit) => {
      this.onSaving.emit(s);
    };

    options.events.selectionChanged = () => { };

    options.readOnly = false;
    // options.width = this.editOption.width;
    options.height = document.body.clientHeight - 50 + "px";

    this.calculateDocumentVariable(options);

    let element = document.getElementById('RichEdit');
    if (element !== null) this.rich = create(element, options);
    this.rich.openDocument(
      this.editOption.documentContent,
      'documentName',
      this.editOption.type as unknown as DocumentFormat
    );
    this.rich.hasUnsavedChanges = true;
    this.rich.selection.goToNextWord(false)
    this.rich.focus();
    this.dataSource.setData(this.editOption.elementList);

    this.treeControl.expandAll();
  }
  /**
    * 文本替换方法
    */
  calculateDocumentVariable(options) {
    options.events.calculateDocumentVariable = (s, e) => {
      if (e.variableName !== "CustomProperty")
        return;
      let key = e?.args[0] ?? "";
      let presentedValue = e?.args[1] ?? "未知属性";
      if (!this.editOption.isShowCode) {
        let value = this.editOption.richEditValueData.find((t) => t.id === key)
          ?.value ?? "------";
        e.value = value;
      }
      else {
        e.value = presentedValue;
      }
      if (this.fieids.find(t => t === key) === undefined)
        this.fieids.push(key);
    };
  }
  fieids: string[] = [];
  ngOnDestroy() {
    if (this.rich) {
      this.rich.dispose();
      this.rich = null;
    }
  }
  selectedIndex = 0;

  private transformer = (node: ElementItem, level: number): FlatNodeEx => (
    {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
      id: node.id,
    });

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  showLeafIcon = false;


  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  getNode(name: string): FlatNode | null {
    return this.treeControl.dataNodes.find((n) => n.name === name) || null;
  }
  /**
   * 左边要素点击事件
   * @param b 
   */
  eleTreeClick(b: FlatNodeEx) {

    this.rich.selection.activeSubDocument.fields.create(this.rich.selection.active, `DOCVARIABLE CustomProperty ${b.id}  ${b.name}  `);
    this.rich.document.fields.updateAllFields(() => { });
    this.rich.selection.showCursorAtEndOfLine = false;
    this.rich.selection.goToNextWord(false)
    this.rich.focus();
  }

  beforeUpload = (file): boolean => {
    this.rich.openDocument(file, "", DocumentFormat.OpenXml);
    return false;
  };

  save() {
    this.rich.document.fields.updateAllFields(() => { });
    this.rich.exportToFile(t => {
      this.onSave.emit({
        file: t,
        fileIds: this.fieids
      });
    }, DocumentFormat.OpenXml)
  }
  print() {
    this.rich.printDocument(PrintMode.Html);
  }
  addSignature() {
    this.rich.beginUpdate();
    //末尾行添加签名
    this.rich.selection.goToDocumentEnd(false)

    var subDocument = this.rich.selection.activeSubDocument;
    var position = this.rich.selection.active;
    position = subDocument.insertText(position, '医生签名： 测试医生名称').end;

    var pg = subDocument.insertParagraph(position);
    var properties = pg.properties;
    properties.alignment = ParagraphAlignment.Right;
    pg.properties = properties;

    position = pg.interval.end;

    this.rich.endUpdate();
    this.rich.focus();
  }
}
