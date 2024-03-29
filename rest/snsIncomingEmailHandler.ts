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

  const notificationType = record.MessageAttributes["notificationType"].Value;

  console.info("notificationType", notificationType);

  if (notificationType !== "Received") {
    console.info("notificationType not Received");
    return;
  }

  // Verify the signature
  // https://docs.aws.amazon.com/sns/latest/dg/sns-verify-signature-of-message.html

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

  // email object schema: (need to see live payload first, w attachments)
  // https://docs.aws.amazon.com/ses/latest/dg/receiving-email-notifications-contents.html

  // need In-Reply-To (commonHeaders.replyTo ?) to thread emails
  // In-Reply-To is listed here https://docs.aws.amazon.com/ses/latest/dg/header-fields.html

  // Matching subjects with prefixes like "Re: " and "Fwd: " is a common way to thread emails
  // https://support.reamaze.com/kb/tips-tricks/how-are-emails-and-conversations-threaded

  const inReplyTo = await prisma.email.findFirst({
    where: {
      sesMessageId: email.mail.commonHeaders.replyTo,
    },
  });

  // await prisma.email.create({
  //   data: {
  //     to: toEmail,
  //     from: fromEmail,
  //     subject: email.mail.commonHeaders.subject,
  //     body: email.content,
  //     sesMessageId: email.mail.commonHeaders.messageId,
  //     thread: {
  //       connect: {
  //         id: inReplyTo?.threadId,
  //       }
  //     }
  //   },
  // });
};
