interface MailBody {
    productName: string;
    productWebUrl: string;
    receiverName: string;
    confirmLink: string;
    language: string;
}
declare function genEmailString(mailBody: MailBody): any;
export default genEmailString;
