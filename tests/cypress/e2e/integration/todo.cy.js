describe('Todo list interactions', () => {
    beforeEach(() => {
        cy.refreshDatabase();
        cy.login({name: 'JohnDoe'});
    });

    it('displays Todos header', () => {
        cy.visit('/dashboard');
        cy.contains('h2', 'Todos');
    });

    it('displays all todo items by default', () => {
        cy.create('App\\Models\\Todo', {name: 'Pay electric bills', user_id: 1});
        cy.create('App\\Models\\Todo', {name: 'Walk the dog', user_id: 1});
        cy.visit('/dashboard');

        cy.get('.todo-list li').should('have.length', 2);
        cy.get('.todo-list li').first().contains('Pay electric bills');
        cy.get('.todo-list li').last().contains('Walk the dog');
      });

      it('filters todo items by category', () => {
        cy.create('App\\Models\\Category', {name: 'Personal', user_id: 1});
        cy.create('App\\Models\\Category', {name: 'Work', user_id: 1});
        cy.create('App\\Models\\Todo', {name: 'Pay electric bills', user_id: 1, category_id: 1});
        cy.create('App\\Models\\Todo', {name: 'Walk the dog', user_id: 1, category_id: 2});
        cy.visit('/dashboard');

        cy.get('.todo-list li').should('have.length', 2);
        cy.get('.todo-list li').first().contains('Pay electric bills');
        cy.get('.todo-list li').last().contains('Walk the dog');
        cy.get('#todo-category').select('Personal');
        cy.get('#todo-add').click();
        cy.url().should('contain', 'Personal');
        cy.get('.todo-list li').should('have.length', 1);
        cy.get('.todo-list li').first().contains('Pay electric bills');

        cy.get('#todo-category').select('Work');
        cy.get('#todo-add').click();
        cy.url().should('contain', 'Work');
        cy.get('.todo-list li').should('have.length', 1);
        cy.get('.todo-list li').first().contains('Walk the dog');
      })


      it('can add new todo items', () => {
        cy.create('App\\Models\\Category', {name: 'Personal', user_id: 1});
        cy.visit('/dashboard');

        const newItem = 'Feed the cat';
        const secondItem = 'Task added with enter key'
        cy.get('#todo-name').type(newItem);
        cy.get('#todo-category').select('Personal');
        cy.get('#todo-add').click();
        cy.get('.todo-list li').should('have.length', 1).contains(newItem);
        cy.get('#todo-name').type(secondItem);
        //pending: remove line below, add logic to keep the selected category saved with query params
        cy.get('#todo-category').select('Personal');
        cy.get('#todo-name').type(`{enter}`);
        cy.get('.todo-list li').should('have.length', 2).contains(secondItem);
        cy.get('.todo-list li').contains('Personal')
      })

      it('can check off an item as completed', () => {
        cy.create('App\\Models\\Todo', {name: 'Pay electric bills', user_id: 1});
        cy.visit('/dashboard');

        getTodoParent()
          .find('button[id=complete-button]')
          .click();

        getTodoParent()
          .find('label')
          .should('have.class', 'line-through');

        getTodoParent()
          .find('button[id=incomplete-button]')
          .click();

        getTodoParent()
          .find('label')
          .should('not.have.class', 'line-through');
      });

      it('can remove todo items', () => {
        cy.create('App\\Models\\Todo', {name: 'Pay electric bills', user_id: 1});
        cy.visit('/dashboard');

        getTodoParent()
        .find('button[id=remove-button]')
        .click();

        cy.contains('Pay electric bills').should('not.exist');
      });

      it('can create a category', () => {
        cy.visit('/dashboard');

        cy.get('#todo-category').should('have.value', 0);

        const categoryName = 'New category';
        cy.get('#todo-name').type(`${categoryName}{enter}`);
        cy.get('.todo-list').should('not.exist');
        cy.get('#todo-category').select(categoryName).should('have.value', 1);

        cy.get('#todo-category').select('Add category');
        const secondCategory = 'Another category';
        cy.get('#todo-name').type(secondCategory);
        cy.get('#todo-add').click();
        cy.get('.todo-list').should('not.exist');
        cy.get('#todo-category').select(secondCategory).should('have.value', 2);
      });

      function getTodoParent(){
        return cy.contains('Pay electric bills').parent().parent();
      }
});