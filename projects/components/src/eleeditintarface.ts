import { DocumentFormat } from "./documentFormat";

export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

export interface OptionsEx {
  /**
   * 文件信息
   */
  documentContent?: File | Blob | ArrayBuffer | string;
  /**
   * 文件类型
   */
  type?: DocumentFormat;
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

export interface FlatNodeEx extends FlatNode {
  id?: string;
}

