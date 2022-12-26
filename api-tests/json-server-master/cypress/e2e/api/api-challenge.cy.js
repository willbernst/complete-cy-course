/// <reference types='cypress' />

import {faker} from '@faker-js/faker'

describe('Post, Get, Delete request', () => {
    let comments = faker.random.words(5)
    let postId = faker.random.numeric(2)

    var bodyOfComments = new Array();

    it('Create a new comment', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/comments',
            body: {
                body: comments,
                postId: postId
            }
        }).then(response => {
            expect(response.status).to.equal(201)
        })
    });

    it('Localte and assert the new comment', () => {
        cy.request({
            method: 'GET',
            url: 'https://localhost:3000/comments',
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(reponse.body))
            body.forEach((item) => {
                bodyOfComments.push(item['body'])
            })
        }).then(() => {
            var latestComment = bodyOfComments[bodyOfComments.length -1]
            expect(latestComment).to.equal(comments)
        })
    });

    it('Delete the new comment', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/comments/' + bodyOfComments.length
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    });
});