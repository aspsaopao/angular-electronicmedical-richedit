import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  create,
  createOptions,
  DocumentFormat,
  FileTabItemId,
  HomeTabItemId,
  Interval,
  Options,
  PrintMode,
  RibbonButtonItem,
  RibbonItem,
  RibbonTab,
  RibbonTabType,
  RichEdit,
  RichEditUnit,
  SavingEventArgs,
  ViewType,
} from 'devexpress-richedit';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import { ElementItem, FlatNode, OptionsEx, FlatNodeEx } from '../eleeditintarface';

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
  @Output() onSave = new EventEmitter<File>();
  @Output() onSaving = new EventEmitter<RichEdit>();

  ngOnInit() { }

  query(info: string) {
    this.onSave.emit(null);
  }

  private rich!: RichEdit;

  ngAfterViewInit(): void {
    const options = createOptions();
    options.ribbon.removeTab(RibbonTabType.Home);
    options.ribbon.removeTab(RibbonTabType.File);
    options.ribbon.removeTab(RibbonTabType.Insert);
    options.ribbon.removeTab(RibbonTabType.PageLayout);
    options.ribbon.removeTab(RibbonTabType.MailMerge);
    options.ribbon.removeTab(RibbonTabType.View);
    options.ribbon.removeTab(RibbonTabType.References);

    const newFindTab = options.ribbon.insertTab(new RibbonTab('文件', 'system1', []), 1);
    const newFindTab2 = options.ribbon.insertTab(new RibbonTab('功能', 'system2', []), 2);
    newFindTab.insertItem(new RibbonButtonItem('saveId', '保存', { beginGroup: true }), 1);
    newFindTab.insertItem(new RibbonButtonItem('printId', '打印', { beginGroup: true }), 2);
    newFindTab2.insertItem(new RibbonButtonItem('printId', '病历调动', { beginGroup: true }), 1);
    options.events.customCommandExecuted = (s, e) => {
      if (e.commandName === 'saveId') {
        s.exportToFile(t => {
          this.onSave.emit(t);
        }, DocumentFormat.OpenXml)
      }
      else if (e.commandName == "printId") {
        s.printDocument(PrintMode.Html);
      }
    };
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
      s.exportToFile(t => {
        this.onSave.emit(t);
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

    this.dataSource.setData(this.editOption.elementList);

    this.treeControl.expandAll();
  }
  /**
    * 文本替换方法
    */
  calculateDocumentVariable(options) {
    options.events.calculateDocumentVariable = (a, b) => {
      if (!this.editOption.isShowCode) {
        let value =
          this.editOption.richEditValueData.find((t) => t.id === b.args[0])
            ?.value ?? b.variableName;
        b.value = value;
      }
      else {
        b.value = b.variableName;
      }
    };
  }

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

  constructor() { }

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  getNode(name: string): FlatNode | null {
    return this.treeControl.dataNodes.find((n) => n.name === name) || null;
  }

  hideCode() {
    this.editOption.isShowCode = true;
    this.rich.document.fields.updateAllFields(() => { });

  }
  hidetest() {
    this.editOption.isShowCode = false;
    this.rich.document.fields.updateAllFields(() => { });
  }
  eleTreeClick(b: FlatNodeEx) {
    this.rich.selection.activeSubDocument.fields.create(this.rich.selection.active, `DOCVARIABLE  ${b.name} ${b.id}`);
    this.rich.document.fields.updateAllFields(() => { });
    this.rich.focus();
  }
}
