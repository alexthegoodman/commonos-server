import prisma from "../prisma";

const https = require("https");
const crypto = require("crypto");

const verifySignature = (message) => {
  return new Promise((resolve, reject) => {
    // Get the certificate
    https
      .get(message.SigningCertURL, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const cert = data;

          // Construct the canonical string
          let canonicalMessage = "";
          canonicalMessage += "Message\n" + message.Message + "\n";
          canonicalMessage += "MessageId\n" + message.MessageId + "\n";
          if (message.Subject) {
            canonicalMessage += "Subject\n" + message.Subject + "\n";
          }
          canonicalMessage += "Timestamp\n" + message.Timestamp + "\n";
          canonicalMessage += "TopicArn\n" + message.TopicArn + "\n";
          canonicalMessage += "Type\n" + message.Type + "\n";

          // Verify the signature
          const verifier = crypto.createVerify("RSA-SHA1");
          verifier.update(canonicalMessage, "utf8");
          const result = verifier.verify(cert, message.Signature, "base64");

          resolve(result);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

export const snsIncomingEmailHandler = async (request, response) => {
  const payload = request.body;

  console.info(
    "snsIncomingEmailHandler payload",
    JSON.stringify(payload, null, 2)
  );

  const record = payload.Records[0].Sns;
  //   const record = event.Records[0].Sns;

  const notificationType = record.MessageAttributes["notificationType"].Value;

  console.info("notificationType", notificationType);

  if (notificationType !== "Received") {
    console.info("notificationType not Received");
    return;
  }

  const isVerified = await verifySignature(record);

  if (!isVerified) {
    console.error("SNS message verification failed");
    return;
  }

  console.info("SNS message verification succeeded");

  const email = JSON.parse(record.Message);

  console.info("email", email);

  const fromEmail = email.mail.commonHeaders.from[0];
  const toEmail = email.mail.commonHeaders.to[0];
  const toUser = await prisma.user.findFirst({
    where: {
      email: toEmail,
    },
  });

  if (!toUser) {
    console.error("User not found for email", toEmail);
    return;
  }

  // do not do s3+sns, just sns (need to see live payload first, w attachments)
  // https://docs.aws.amazon.com/ses/latest/dg/receiving-email-notifications-contents.html

  //   await prisma.email.create({
  //     data: {
  //       to: toEmail,
  //       from: fromEmail,
  //       subject: email.mail.commonHeaders.subject,
  //       //   body: email.
  //     },
  //   });
};
