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
  /**
   *病历捆绑id
   * */
  id: string;
  /**
   *捆绑对应值
   * */
  value: string;
}

export interface ElementItem {
  /**
   * 要素id
   * */
  id?: string;
  /**
   * 要素名称
   * */
  name: string;
  /**
   *子集要素
   * */
  children?: ElementItem[];
}

export interface PMItem {
  /**
   *病历id
   * */
  medicalId: string;
  /**
   *病历名称
   * */
  medicalName: string;
  /**
   *添加时间
   * */
  createtime: string;
}
/**
 * 
 */
export interface FlatNodeEx extends FlatNode {
  id?: string;
}

export interface SaveFiles {
  /**
   *文件信息
   * */
  file: File;
  /**
   *病历模板捆绑要素等字段ID
   * */
  fileIds: string[];
}

