import { TodoModel } from "./todo.model";
import { Document } from "mongoose";

type TodoDocument = Document & Todo;

export interface Todo {
  id?: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

const validateTodoUpdate = (todo: Todo): Todo => {
  if (!todo.id || todo.id.trim().length <= 0) {
    throw new Error("id required and must be a string");
  }
  if (
    todo.title &&
    (typeof todo.title !== "string" || todo.title.trim().length <= 3)
  ) {
    throw new Error("title is required and must be a string");
  }
  if (
    todo.description &&
    (typeof todo.description !== "string" ||
      todo.description.trim().length <= 3)
  ) {
    throw new Error("description is required and must be a string");
  }

  if (todo.completed && typeof todo.completed !== "boolean") {
    throw new Error("completed must be a boolean");
  }

  //whitelist fields
  const { id, title, description, completed } = todo;
  return { id, title, description, completed };
};

const validateTodoCreate = (todo: Todo): Todo => {
  if (
    !todo.title ||
    typeof todo.title !== "string" ||
    todo.title.trim().length <= 3
  ) {
    throw new Error("title is required and must be a string");
  }
  if (
    !todo.description ||
    typeof todo.description !== "string" ||
    todo.description.trim().length <= 3
  ) {
    throw new Error("description is required and must be a string");
  }


  //whitelist fields
  const { id, title, description } = todo;
  return { title, description };
};

export const ExceptionError: Error = {} as Error;

export const todoResolver = {
  Query: {
    getTodo: async (_: unknown, args: { id: string }): Promise<TodoDocument | Error> => {
      try {
        if(!args.id || typeof(args.id) !== "string"){
          throw new Error("id is required and must be a string")
        }
        const todo = await TodoModel.findById(args.id);
        if(!todo) throw new Error("no such item found");

        return todo as TodoDocument;
      } catch (error) {
        console.log(error);
        return error as Error
      }
    },
    getTodos: async (): Promise<TodoDocument[] | Error> => {
      try {
        const todos = await TodoModel.find({});
        return todos as TodoDocument[];
      } catch (error) {
        console.log(error);
        return error as Error
      }
    },
  },

  Mutation: {
    createTodo: async (_: unknown, args: {todo: Todo}): Promise<TodoDocument | Error> => {
      try {
        const todo = validateTodoCreate(args.todo);
        const createdTodo = await TodoModel.create(todo);
        todo.id = `${createdTodo?._id.toString()}`;
        (createdTodo).id = createdTodo?._id.toString();
        await createdTodo?.save();
        return createdTodo as TodoDocument;
      } catch (error) {
        console.log(error);
        return error as Error
      }
    },
    updateTodo: async (_: unknown, args: {todo: Todo}): Promise<TodoDocument | Error> => {
      try {
        const todo = validateTodoUpdate(args.todo);
        const updatedTodo = await TodoModel.findByIdAndUpdate(args.todo.id, todo, {new: true});
        return updatedTodo as TodoDocument;
      } catch (error) {
        console.log(error);
        return error as Error
      }
    },

    deleteTodo: async (_: unknown, args: { id: string }): Promise<boolean | Error> => {
      try {
        if (!args.id || typeof args.id !== "string") {
          throw new Error("id is required and must be string");
        }

        await TodoModel.deleteOne({ id: args.id });
        return true;
      } catch (error) {

        console.log(error);
        return error as Error;
      }
    },
  },
};
