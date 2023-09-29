"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mailgen = require("mailgen");
function genEmailString(mailBody) {
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
                },
            },
            outro: `Outro`,
        },
    };
    return mailGenerator.generate(email);
}
exports.default = genEmailString;
//# sourceMappingURL=emailConfirm.js.map