import { PlatformLocale } from "../platform/platform.interface";

export enum Platform {
  iOS = "iOS",
  Android = "Android",
}

export enum TemplateType {
  grapic,
  mobile,
  tablet,
}

export type Size = {
  w: number;
  h: number;
};

export type Position = {
  x: number;
  y: number;
};

export type Box = {
  topLeft: Position;
  bottomRight: Position;
};

export type Frame = {
  size: Size;
  name: string;
  maxCount: number;
};

export type Template = {
  name: string;
  platform: Platform;
  type: TemplateType;
  frame: Frame;
};

export interface TemplateService {
  getTemplates(platform: Platform): Template[];

  getFrameName(
    locale: PlatformLocale,
    frame: Frame,
    index: number
  ): string;
}

export interface TemplateRepository {
  count: string;
  locale: string;
  templates: {
    [platform in Platform]: Template[];
  };
}
