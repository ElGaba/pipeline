describe('Authentication', () => {
    beforeEach(() => {
        cy.refreshDatabase();
    });

    it('provides feedback for invalid login credentials', () => {
        cy.visit('/login');
        
        cy.get('#email').type('foo@example.com');
        cy.get('#password').type('password');
        cy.contains('button', 'Log in').click();
        cy.contains('These credentials do not match our records.');
    });

    it('signs a user in', () => {
        
        cy.create('App\\Models\\User', {email: 'joe@example.com'});

        cy.visit('/login');
        
        cy.get('#email').type('joe@example.com');
        cy.get('#password').type('password');
        cy.contains('button', 'Log in').click();
        cy.assertRedirect('/dashboard');
    });

    it('visits the dasboard', () => {
        cy.login({name: 'JohnDoe'});

        cy.visit('/dashboard').contains('JohnDoe');
    });

    it('visits the login', () => {
        cy.visit('/').contains('Log in');
        cy.visit('/').contains("Don't have an account?");
    });
});