import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

interface Todo {
    id: number;
    title: string;
    dueDate: Date | undefined;
    completed: boolean;
}

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: 1,
            title: 'Learn React',
            dueDate: new Date('2025-01-16'),
            completed: false,
        },
        {
            id: 2,
            title: 'Build a Todo App',
            dueDate: undefined,
            completed: false,
        },
        {
            id: 3,
            title: 'Deploy to Production',
            dueDate: undefined,
            completed: false,
        },
    ]);
    const [newTodo, setNewTodo] = useState('');
    const [newDueDate, setNewDueDate] = useState<Date | undefined>(undefined);

    const addTodo = () => {
        if (!newTodo.trim()) return;
        setTodos([
            ...todos,
            {
                id: todos.length + 1,
                title: newTodo,
                dueDate: newDueDate,
                completed: false,
            },
        ]);
        setNewTodo('');
        setNewDueDate(undefined);
    };

    return (
        <AppLayout>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4 flex w-full gap-4">
                        <Input
                            className="flex-1"
                            placeholder="Add a new todo..."
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addTodo();
                                }
                            }}
                        />
                        <DatePicker
                            date={newDueDate}
                            onDateChange={setNewDueDate}
                            placeholder="Due date"
                        />
                        <Button onClick={addTodo}>Add</Button>
                    </div>
                    {todos.length === 0 ? (
                        <p className="text-center text-muted-foreground">
                            No todos yet. Add one above!
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {todos.map((todo, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between rounded-md border p-4"
                                >
                                    <span className="flex items-center gap-4">
                                        <Checkbox
                                            checked={todo.completed}
                                            onCheckedChange={(
                                                checked: boolean,
                                            ) => {
                                                const updatedTodos = todos.map(
                                                    (t) =>
                                                        t.id === todo.id
                                                            ? {
                                                                  ...t,
                                                                  completed:
                                                                      checked ||
                                                                      false,
                                                              }
                                                            : t,
                                                );
                                                setTodos(updatedTodos);
                                            }}
                                        />
                                        <span
                                            className={
                                                todo.completed
                                                    ? 'text-muted-foreground line-through'
                                                    : ''
                                            }
                                        >
                                            {todo.title}
                                        </span>
                                    </span>
                                    {todo.dueDate && (
                                        <span className="text-sm text-muted-foreground">
                                            Due:{' '}
                                            {todo.dueDate.toLocaleDateString()}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
