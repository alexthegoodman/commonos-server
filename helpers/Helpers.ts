import jwt from "jsonwebtoken";
const { DateTime } = require("luxon");

export default class Helpers {
  isDefinedWithContent(item: any) {
    if (typeof item !== "undefined" && item && item !== "" && item !== null) {
      if (item.constructor === Array && item.length > 0) {
        return true;
      } else if (item.constructor === Array && item.length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  parseAuthHeader(str: string) {
    console.info("parseAuthHeader", str);
    const credentials = Buffer.from(str.split("Basic ")[1], "base64").toString(
      "ascii"
    );
    return credentials.split(":");
  }

  createJWT(data: any) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY as jwt.Secret;
    const jwtData = {
      time: Date(),
      ...data,
    };
    const jwtOptions = {
      expiresIn: "7d",
    };

    const token = jwt.sign(jwtData, jwtSecretKey, jwtOptions);

    return token;
  }

  async emailToUsername(email: string) {
    // const { nanoid } = await import("nanoid");

    const emailUsername = email.split("@")[0];
    // const pin = nanoid(10);
    const generatedUsername = emailUsername + "-";
    //+ pin;

    return generatedUsername;
  }

  createAuthHeader(str: string) {
    const authPayload = Buffer.from(`${str}`, "utf8").toString("base64");
    return `Basic ${authPayload}`;
  }

  getUploadDirectory(fileName: string) {
    const year = DateTime.now().toFormat("yyyy");
    const month = DateTime.now().toFormat("MM");
    const folder = `${year}/${month}/`;
    const sanitizedFileName = fileName.replace(/[^a-z0-9.]/gi, "_");
    const path = folder + sanitizedFileName;
    return path;
  }

  getTokenLimit(currentUser) {
    const tokenUsageLimit =
      currentUser.subscription === "NONE"
        ? 50000
        : currentUser.subscription === "STANDARD"
          ? 2000000
          : 0;

    return tokenUsageLimit;
  }
}
