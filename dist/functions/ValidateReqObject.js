"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_object = (req_object, schema) => {
    try {
        schema.parse(req_object);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.default = validate_object;
//# sourceMappingURL=ValidateReqObject.js.map