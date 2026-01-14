import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

interface Todo {
    id: number;
    title: string;
    due_date: string | null;
    completed: boolean;
}

interface Filters {
    search: string;
    incomplete_only: boolean;
}

interface Props {
    todos: Todo[];
    filters: Filters;
}

export default function Todos({ todos, filters }: Props) {
    const [newTodo, setNewTodo] = useState('');
    const [newDueDate, setNewDueDate] = useState<Date | undefined>(undefined);
    const [search, setSearch] = useState(filters.search);
    const [incompleteOnly, setIncompleteOnly] = useState(filters.incomplete_only);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const applyFilters = (newSearch: string, newIncompleteOnly: boolean) => {
        router.get(
            '/todos',
            {
                search: newSearch || undefined,
                incomplete_only: newIncompleteOnly || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Only trigger search if 3+ characters or clearing the search
        if (search.length >= 3 || (search.length === 0 && filters.search)) {
            debounceRef.current = setTimeout(() => {
                applyFilters(search, incompleteOnly);
            }, 1000);
        }

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [search]);

    const handleIncompleteOnlyChange = (checked: boolean) => {
        setIncompleteOnly(checked);
        applyFilters(search.length >= 3 ? search : '', checked);
    };

    const addTodo = () => {
        if (!newTodo.trim()) return;
        router.post('/todos', {
            title: newTodo,
            due_date: newDueDate,
        });
        setNewTodo('');
        setNewDueDate(undefined);
    };

    const markTodoComplete = (id: number, completed: boolean) => {
        router.patch(`/todos/${id}`, { completed });
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

                    <div className="mb-4 flex items-center gap-4">
                        <Input
                            className="max-w-xs"
                            placeholder="Search todos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="incomplete-only"
                                checked={incompleteOnly}
                                onCheckedChange={(checked) =>
                                    handleIncompleteOnlyChange(Boolean(checked))
                                }
                            />
                            <Label htmlFor="incomplete-only">
                                Show incomplete only
                            </Label>
                        </div>
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
                                            onCheckedChange={(checked) =>
                                                markTodoComplete(
                                                    todo.id,
                                                    Boolean(checked),
                                                )
                                            }
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
                                    {todo.due_date && (
                                        <span className="text-sm text-muted-foreground">
                                            Due: {todo.due_date}
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
