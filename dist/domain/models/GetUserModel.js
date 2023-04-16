"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserModel = void 0;
class GetUserModel {
    constructor(email) {
        this.email = email;
    }
    equals(entity) {
        if (!(entity instanceof GetUserModel))
            return false;
        return this.email === entity.email;
    }
}
exports.GetUserModel = GetUserModel;
//# sourceMappingURL=GetUserModel.js.map