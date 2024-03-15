import {
  CreateConfigurationSetCommand,
  DeleteIdentityCommand,
  GetIdentityDkimAttributesCommand,
  SESClient,
  SendEmailCommand,
  SetIdentityDkimEnabledCommand,
  VerifyDomainDkimCommand,
  VerifyDomainIdentityCommand,
} from "@aws-sdk/client-ses";
import { nanoid } from "nanoid";
import ERROR_CODES from "./ERROR_CODES";
const { DateTime } = require("luxon");

export default class AWS_SES {
  REGION = "us-east-2";
  sesClient: SESClient | undefined;

  constructor() {
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.sesClient = new SESClient({
        region: this.REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
    }
  }

  async createEmailIdentity(domainName: string) {
    const command = new VerifyDomainIdentityCommand({
      Domain: domainName,
    });

    const data = await this.sesClient?.send(command);

    console.info("VerifyDomainIdentityCommand", data);

    // parse token
    const token = data?.VerificationToken;

    const commandx = new VerifyDomainDkimCommand({
      Domain: domainName,
    });

    const datax = await this.sesClient?.send(commandx);

    console.info("VerifyDomainDkimCommand", datax);

    const dkimData = datax?.DkimTokens;

    // call after setting dns records?
    // const command2 = new GetIdentityDkimAttributesCommand({
    //   Identities: [domainName],
    // });

    // const data2 = await this.sesClient?.send(command2);

    // console.info("GetIdentityDkimAttributesCommand", data2);

    return dkimData;
  }

  async deleteEmailIdentity(domainName: string) {
    const command = new DeleteIdentityCommand({
      Identity: domainName,
    });

    const data = await this.sesClient?.send(command);

    console.info("DeleteIdentityCommand", data);

    return true;
  }

  async sendEmail(
    from: string,
    to: string,
    subject: string,
    body: string
  ): Promise<any> {
    // TODO: needs to add In-Reply-To and References headers to thread emails
    // will use https://nodemailer.com/transports/ses/ for that

    const command = new SendEmailCommand({
      Source: from,
      Destination: {
        ToAddresses: [to],
        // CcAddresses: [],
        // BccAddresses: [],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          // Text: {
          //   Data: body,
          // },
          Html: {
            Data: body,
          },
        },
      },
    });

    const data = await this.sesClient?.send(command);

    return data;
  }
}
