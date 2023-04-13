export class EmailContentDTO {
  subject: string;
  body: string;
}

export function sendEmail(email: string, content: EmailContentDTO) {
  console.info(
    `[NotificationService]: Email "${content.subject}" sent to ${email}.`,
  );
}
