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
  RibbonButtonItem,
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

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

export interface OptionsEx {
  /**
   * 文件信息
   */
  documentBase64?: string;
  /**
   * 宽度
   */
  width?: string;
  /**
   * 高度
   */
  height?: string;
  /**
   *左边要素目录
   * */
  elementList?: ElementItem[];
  /**
   *患者历史病历列表
   * */
  patientMedicalList?: PMItem[];
  /**
   *是否显示代码
   * */
  isShowCode?: boolean | false;
  /**
   * 模板对应的患者病历字段
   * */
  richEditValueData?: EditValueItem[];
}
export interface EditValueItem {
  id: string;
  value: string;
}

export interface ElementItem {
  id?: string;

  name: string;

  children?: ElementItem[];
}

export interface PMItem {
  medicalId: string;

  medicalName: string;

  createtime: string;
}

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
  @Output() onSave = new EventEmitter<RichEdit>();
  @Output() onSaving = new EventEmitter<RichEdit>();

  ngOnInit() { }

  query(info: string) {
    this.onSave.emit(null);
  }

  private rich!: RichEdit;

  ngAfterViewInit(): void {
    // this.editOption.RichEdit = createOptions();
    // the createOptions() method creates an object that contains RichEdit options initialized with default values
    const options = createOptions();

    // options.bookmarks.visibility = true;
    // options.bookmarks.color = '#ff0000';

    // options.confirmOnLosingChanges.enabled = true;
    // options.confirmOnLosingChanges.message =
    //   'Are you sure you want to perform the action? All unsaved document data will be lost.';

    // options.fields.updateFieldsBeforePrint = true;
    // options.fields.updateFieldsOnPaste = true;

    // options.mailMerge.activeRecord = 2;
    // options.mailMerge.viewMergedData = true;
    // options.mailMerge.dataSource = [
    //   { Name: 'Indy', age: 32 },
    //   { Name: 'Andy', age: 28 },
    // ];

    // events
    options.events.activeSubDocumentChanged = () => { };
    options.events.autoCorrect = () => { };
    options.events.calculateDocumentVariable = (a, b) => {
      if (!this.editOption.isShowCode) {
        let value =
          this.editOption.richEditValueData.find((t) => t.id === b.args[0])
            ?.value ?? '';
        b.value = value;
      }
    };
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
      this.onSave.emit(s);
    };
    options.events.saved = (s: RichEdit) => {
      this.onSaving.emit(s);
    };
    options.events.selectionChanged = () => { };
    options.events.customCommandExecuted = (s, e) => {
      switch (e.commandName) {
        case 'insertEmailSignature':
          s.document.insertParagraph(s.document.length);
          s.document.insertText(s.document.length, '_________');
          s.document.insertParagraph(s.document.length);
          s.document.insertText(s.document.length, 'Best regards,');
          s.document.insertParagraph(s.document.length);
          s.document.insertText(s.document.length, 'John Smith');
          s.document.insertParagraph(s.document.length);
          s.document.insertText(s.document.length, 'john@example.com');
          s.document.insertParagraph(s.document.length);
          s.document.insertText(s.document.length, '+1 (818) 844-0000');
          break;
      }
    };

    options.unit = RichEditUnit.Inch;

    // options.view.viewType = ViewType.PrintLayout;
    // options.view.simpleViewSettings.paddings = {
    //   left: 15,
    //   top: 15,
    //   right: 15,
    //   bottom: 15,
    // };

    options.autoCorrect = {
      correctTwoInitialCapitals: true,
      detectUrls: true,
      enableAutomaticNumbering: true,
      replaceTextAsYouType: true,
      caseSensitiveReplacement: false,
      replaceInfoCollection: [
        { replace: 'wnwd', with: 'well-nourished, well-developed' },
        { replace: '(c)', with: '©' },
      ],
    };
    // capitalize the first letter at the beginning of a new sentence/line
    options.events.autoCorrect = function (s, e) {
      if (e.text.length == 1 && /\w/.test(e.text)) {
        var prevText = s.document.getText(
          new Interval(e.interval.start - 2, 2)
        );
        if (
          prevText.length == 0 ||
          /^(\. |\? |\! )$/.test(prevText) ||
          prevText.charCodeAt(1) == 13
        ) {
          var newText = e.text.toUpperCase();
          if (newText != e.text) {
            s.beginUpdate();
            s.history.beginTransaction();
            s.document.deleteText(e.interval);
            s.document.insertText(e.interval.start, newText);
            s.history.endTransaction();
            s.endUpdate();
            e.handled = true;
          }
        }
      }
    };
    options.readOnly = false;
    options.width = this.editOption.width;
    options.height = this.editOption.height;
    let element = document.getElementById('RichEdit');
    if (element !== null) this.rich = create(element, options);
    this.rich.openDocument(
      this.editOption.documentBase64,
      'DocumentName',
      DocumentFormat.Rtf
    );
    this.dataSource.setData(this.editOption.elementList);

    this.treeControl.expandAll();
  }

  ngOnDestroy() {
    if (this.rich) {
      this.rich.dispose();
      this.rich = null;
    }
  }
  tabs = ['Tab 1', 'Tab 2'];
  selectedIndex = 0;

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push('New Tab');
    this.selectedIndex = this.tabs.length;
  }
  private transformer = (node: ElementItem, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
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
  add() {

  }
}
