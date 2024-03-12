import { Notification } from "../../../util/notification";
import { ConfigService } from "../../components/config/config.interface";
import { Cmd } from "../cmd";

export default class ResetConfigurationCmd implements Cmd {
  constructor(private configService: ConfigService) {}

  public async onRun(args: any): Promise<void> {
    await this.configService.clear();
    Notification.i(`Configuration reset complete.`);
  }

  public async onMessage(
    message: any,
    props: OnMessageProperties
  ): Promise<void> {}
}
