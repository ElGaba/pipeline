<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Todos') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="h-100 w-full flex items-center justify-center font-sans">
            <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div class="mb-4">
                    <h1 class="text-gray-900">Todo List</h1>
                    <form class="flex mt-4" action="/todo" method="POST">
                        @csrf
                        <input name="name" id="add-todo" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700" placeholder="Add Todo">
                        <button type="submit" class="flex shrink-0 p-2 border-2 rounded text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500" >Add</button>
                    </form>

                </div>
                <ul class="todo-list">
                    @foreach(auth()->user()->todos as $todo)
                    <li class="flex mb-4 items-center border-b border-t border-gray-100">
                        <label class="w-full text-gray-900 {{ $todo->complete ? 'line-through': ''; }}">{{ $todo->name }}</label>
                        @if(!$todo->complete)
                        <form action="/todo/toggle-complete/{{$todo->id}}" method="POST" class="flex shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">
                            @csrf
                            <button id="complete-button" type="submit">Done</button>
                        </form>
                        @else
                        <form action="/todo/toggle-complete/{{$todo->id}}" method="POST" class="flex shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-500 border-gray-500 hover:bg-gray-500">
                            @csrf
                            <button id="incomplete-button">Not Done</button>
                        </form>
                        @endif
                        <form action="/todo/{{ $todo->id }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button id="remove-button" type="submit" class="flex shrink-0 p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</button>
                        </form>
                    </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</x-app-layout>
