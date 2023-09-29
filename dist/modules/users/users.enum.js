"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["OWNER"] = "OWNER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MEMBER"] = "MEMBER";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["BANNED"] = "BANNED";
    UserStatus["TEMPORARY_BAN"] = "TEMPORARY_BAN";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
//# sourceMappingURL=users.enum.js.map