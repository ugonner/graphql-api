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
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoResolver = exports.ExceptionError = void 0;
const todo_model_1 = require("./todo.model");
const validateTodoUpdate = (todo) => {
    if (!todo.id || todo.id.trim().length <= 0) {
        throw new Error("id required and must be a string");
    }
    if (todo.title &&
        (typeof todo.title !== "string" || todo.title.trim().length <= 3)) {
        throw new Error("title is required and must be a string");
    }
    if (todo.description &&
        (typeof todo.description !== "string" ||
            todo.description.trim().length <= 3)) {
        throw new Error("description is required and must be a string");
    }
    if (todo.completed && typeof todo.completed !== "boolean") {
        throw new Error("completed must be a boolean");
    }
    //whitelist fields
    const { id, title, description, completed } = todo;
    return { id, title, description, completed };
};
const validateTodoCreate = (todo) => {
    if (!todo.title ||
        typeof todo.title !== "string" ||
        todo.title.trim().length <= 3) {
        throw new Error("title is required and must be a string");
    }
    if (!todo.description ||
        typeof todo.description !== "string" ||
        todo.description.trim().length <= 3) {
        throw new Error("description is required and must be a string");
    }
    //whitelist fields
    const { id, title, description } = todo;
    return { title, description };
};
exports.ExceptionError = {};
exports.todoResolver = {
    Query: {
        getTodo: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!args.id || typeof (args.id) !== "string") {
                    throw new Error("id is required and must be a string");
                }
                const todo = yield todo_model_1.TodoModel.findById(args.id);
                if (!todo)
                    throw new Error("no such item found");
                return todo;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        }),
        getTodos: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const todos = yield todo_model_1.TodoModel.find({});
                return todos;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        }),
    },
    Mutation: {
        createTodo: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const todo = validateTodoCreate(args.todo);
                const createdTodo = yield todo_model_1.TodoModel.create(todo);
                todo.id = `${createdTodo === null || createdTodo === void 0 ? void 0 : createdTodo._id.toString()}`;
                (createdTodo).id = createdTodo === null || createdTodo === void 0 ? void 0 : createdTodo._id.toString();
                yield (createdTodo === null || createdTodo === void 0 ? void 0 : createdTodo.save());
                return createdTodo;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        }),
        updateTodo: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const todo = validateTodoUpdate(args.todo);
                const updatedTodo = yield todo_model_1.TodoModel.findByIdAndUpdate(args.todo.id, todo, { new: true });
                return updatedTodo;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        }),
        deleteTodo: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!args.id || typeof args.id !== "string") {
                    throw new Error("id is required and must be string");
                }
                yield todo_model_1.TodoModel.deleteOne({ id: args.id });
                return true;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        }),
    },
};
