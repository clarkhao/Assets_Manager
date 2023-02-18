"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFiles = exports.isMimeTypeOK = exports.isSizeOK = void 0;
const isSizeOK = (file) => file.size < 2 * 1024 * 1024 ? { pass: true, reason: [] } : { pass: false, reason: [`file size too big`] };
exports.isSizeOK = isSizeOK;
const isMimeTypeOK = (file) => (file.mimetype !== null ? ['image/jpeg', 'image/png', 'image/x-icon', 'application/json', 'image/svg+xml'].indexOf(file.mimetype) > -1 : false) ? { pass: true, reason: [] } : { pass: false, reason: ['not supported mimetype'] };
exports.isMimeTypeOK = isMimeTypeOK;
const validateFiles = (validated) => {
    return (value) => validated.reduce((result, v) => {
        return Object.assign(Object.assign({}, result), { pass: result.pass && v(value).pass, reason: [...result.reason, ...v(value).reason] });
    }, { pass: true, reason: [] });
};
exports.validateFiles = validateFiles;
