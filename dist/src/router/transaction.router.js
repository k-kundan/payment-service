"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = __importDefault(require("../controller/transaction.controller"));
const router = (0, express_1.Router)();
const transactionController = new transaction_controller_1.default();
router.get('/', transactionController.get);
exports.default = router;
//# sourceMappingURL=transaction.router.js.map