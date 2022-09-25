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
    },

    setQueryParams(){
        let urlParams = new URLSearchParams(window.location.search);
        if(document.getElementById('todo-name').value != ''){
            urlParams.set('name', document.getElementById('todo-name').value);
        };
        let selectedIndex = document.getElementById('todo-category').selectedIndex;
        if(selectedIndex > 0){
            urlParams.set('category', document.getElementById('todo-category').options[selectedIndex].text);
            urlParams.set('selectedIndex', selectedIndex);
        }
        else{
            urlParams.delete('name');
            urlParams.delete('category');
            urlParams.delete('selectedIndex');
        };
        window.location.search = urlParams;
    }
}));

Alpine.start();
