/// <reference types='cypress' />

describe('Put Request', () => {
    it('Update an existing post via the /post api', () => {
        cy.request({
            method: 'PUT',
            url: 'http://localhost:3000/post/2',
            body: {
                title: 'Where can i buy apples?',
                author: 'Unknow'
            },
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    });
});