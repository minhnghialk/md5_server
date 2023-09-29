"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayMode = exports.ReceiptStatus = void 0;
var ReceiptStatus;
(function (ReceiptStatus) {
    ReceiptStatus["SHOPPING"] = "SHOPPING";
    ReceiptStatus["PENDING"] = "PENDING";
    ReceiptStatus["ACCEPTED"] = "ACCEPTED";
    ReceiptStatus["SHIPPING"] = "SHIPPING";
    ReceiptStatus["DONE"] = "DONE";
})(ReceiptStatus || (exports.ReceiptStatus = ReceiptStatus = {}));
var PayMode;
(function (PayMode) {
    PayMode["ZALO"] = "ZALO";
    PayMode["CASH"] = "CASH";
})(PayMode || (exports.PayMode = PayMode = {}));
//# sourceMappingURL=receipts.enum.js.map