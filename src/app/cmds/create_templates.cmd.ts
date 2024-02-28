import { FigmaService } from "../../components/figma/figma.interface";
import { TemplateService } from "../../components/template/template.interface";
import { TranslatorLanguage } from "../../components/translator_language/translator_language.interface";
import { Cmd } from "./cmd";

export class CreateTemplatesCmd implements Cmd {
  constructor(
    private figmaService: FigmaService,
    private templateService: TemplateService
  ) {}

  public onRun({
    sourceLanguage,
  }: {
    sourceLanguage: TranslatorLanguage;
  }): void {
    this.figmaService.createFrame({
      name: "hahaha!",
      size: { w: 1284, h: 2778 },
      position: { x: 0, y: 0 },
    });
  }
}
