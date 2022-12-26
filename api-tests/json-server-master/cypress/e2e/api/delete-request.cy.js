/// <reference types='cypress' />

describe('Delete Requests', () => {
    it('Delete a post via /posts api', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/posts/2',
            body: {
                title: 'where can i buy apples?',
                author: 'Unknow'
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    });
});