interface MailOption {
    to: string;
    subject: string;
    html?: string;
    text?: string;
}
import emailConfirm from './templates/emailConfirm';
import sendOtp from './templates/sendOtp';
export declare const templates: {
    emailConfirm: typeof emailConfirm;
    sendOtp: typeof sendOtp;
};
export declare class MailService {
    sendMail(mailOption: MailOption): Promise<boolean>;
}
export {};
