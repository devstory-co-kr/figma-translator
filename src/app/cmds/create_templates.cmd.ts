import { FigmaService } from "../../components/figma/figma.interface";
import {
  Platform,
  TemplateService,
} from "../../components/template/template.interface";
import { Cmd } from "./cmd";

export class CreateTemplatesCmd implements Cmd {
  constructor(
    private figmaService: FigmaService,
    private templateService: TemplateService
  ) {}

  public onRun({ platform }: { platform: Platform }): void {
    console.log(platform);
    this.figmaService.createFrame({
      name: "hahaha!",
      size: { w: 1284, h: 2778 },
      position: { x: 0, y: 0 },
    });
  }
}
