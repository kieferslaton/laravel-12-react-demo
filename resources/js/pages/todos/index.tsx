import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

export default function Todos() {
    const [todos, setTodos] = useState<string[]>([
        'Learn React',
        'Build a Todo App',
        'Deploy to Production',
    ]);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        if (!newTodo.trim()) return;
        setTodos([...todos, newTodo]);
        setNewTodo('');
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
                                    className="rounded-md border p-4"
                                >
                                    {todo}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
