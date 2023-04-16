"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
class Login {
    constructor(email, password, id) {
        this.email = email;
        this.password = password;
        this.id = id;
    }
    equals(entity) {
        if (!(entity instanceof Login))
            return false;
        return this.email === entity.email;
    }
}
exports.Login = Login;
//# sourceMappingURL=Login.js.map