"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoGraphqlSchema = void 0;
exports.todoGraphqlSchema = `#graphql 
    type Todo {
        id: ID!,
        title: String,
        description: String,
        completed: Boolean
    },

    input TodoInput{
        id: String,
        title: String,
        description: String,
        completed: Boolean
    },

    type Query {
        getTodo(id: ID!): Todo,
        getTodos: [Todo]
    },

    type Mutation {
        createTodo(todo: TodoInput): Todo,
        updateTodo(todo: TodoInput): Todo,
        deleteTodo(id: ID!): ID
    }
`;
