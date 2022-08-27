describe('Todo list interactions', () => {
    beforeEach(() => {
        cy.refreshDatabase();
        cy.login({name: 'JohnDoe'});
    });

    it('displays Todos header', () => {
        cy.visit('/dashboard')
        cy.contains('h2', 'Todos')
    });

    it('displays two todo items by default', () => {
        cy.create('App\\Models\\Todo', {name: 'Pay electric bills', user_id: 1});
        cy.create('App\\Models\\Todo', {name: 'Walk the dog', user_id: 1});
        cy.visit('/dashboard')
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.get('.todo-list li').should('have.length', 2)
    
        // We can go even further and check that the default todos each contain
        // the correct text. We use the `first` and `last` functions
        // to get just the first and last matched elements individually,
        // and then perform an assertion with `should`.
        cy.get('.todo-list li').first().contains('Pay electric bills')
        cy.get('.todo-list li').last().contains('Walk the dog')
      })
});