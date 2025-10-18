import { Todo } from '@/app/utils/types';

const TodoList = ({ todos }: { todos: Todo[] }) => (
  <div className="flex flex-col p-4 space-y-2">
    {todos.map(todo => (
      <span key={todo.id} className="text-gray-700">
        {todo.title}
      </span>
    ))}
  </div>
);

export default TodoList