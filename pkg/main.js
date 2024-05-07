"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_schema_1 = require("./todo/todo.schema");
const server_1 = require("@apollo/server");
const todo_resolver_1 = require("./todo/todo.resolver");
const cors_1 = __importDefault(require("cors"));
const express4_1 = require("@apollo/server/express4");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = new server_1.ApolloServer({
    typeDefs: todo_schema_1.todoGraphqlSchema,
    resolvers: todo_resolver_1.todoResolver,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUri = "mongodb+srv://jonapwdanambra:jQC7buhXH2f8bEqH@cluster0.pfiyczu.mongodb.net/tododb?retryWrites=true&w=majority&appName=Cluster0";
    yield mongoose_1.default.connect(mongoUri);
    yield server.start();
    //exposed mongo uri cos this is a test app
    app.use("/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {}));
}))();
const PORT = process.env.PORT;
app.listen(4000, () => console.log("app running on port", PORT));
exports.default = app;
