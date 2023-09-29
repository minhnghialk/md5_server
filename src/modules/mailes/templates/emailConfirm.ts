import * as Mailgen from 'mailgen';

interface MailBody {
  productName: string;
  productWebUrl: string;
  receiverName: string;
  confirmLink: string;
  language: string;
}

function genEmailString(mailBody: MailBody) {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: mailBody.productName,
      link: mailBody.confirmLink,
    },
  });

  const email = {
    body: {
      greeting: 'Hello',
      signature: 'Xin chào',
      name: mailBody.receiverName,
      intro: `Chúng tôi là ${mailBody.productName}`,
      action: {
        instructions: `Xin chào ${mailBody.receiverName}, vui lòng bấm vào nút xác nhận!`,
        button: {
          color: '#22BC66',
          text: 'Xác nhận',
          link: mailBody.confirmLink,
          // link: 'http://127.0.0.1:3000/api/v1/users/email-authentication/',
        },
      },
      outro: `Outro`,
    },
  };

  return mailGenerator.generate(email);
}

export default genEmailString;
