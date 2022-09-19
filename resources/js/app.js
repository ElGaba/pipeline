require('./bootstrap');

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.data('todoForm', () => ({

    enterKey(){
        if (event.keyCode === 13) {
            document.getElementById('todo-add').click();
        }
    },

    callCreateCategoryOrTodo(){
        let form = document.getElementById('todo-form');
         if(document.getElementById('todo-category').value == 0)
          {
            form.action = '/category'; form.submit()
        } else {
            form.action = '/todo'; form.submit()
        }
    }
}));

Alpine.start();
