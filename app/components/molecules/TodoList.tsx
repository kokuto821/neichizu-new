import { getAllTodos } from '@/app/utils/supabaseFunctions';
import { Todo } from '@/app/utils/types';
import { useState, useEffect } from 'react';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    const result = await getAllTodos();
    if (!result?.data) return;
    setTodos(result.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex flex-col p-4 space-y-2">
      {todos.map((todo) => (
        <span key={todo.id} className="text-gray-700">
          {todo.title}
        </span>
      ))}
    </div>
  );
};
