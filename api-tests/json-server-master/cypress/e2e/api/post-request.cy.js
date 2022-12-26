/// <reference types='cypress' />

import {faker} from '@faker-js/faker'

describe('Post Request', () => {
    var titleOfPosts = new Array();

    let randomTitle = faker.random.words(3)

    it('Create a new post via /posts api', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/posts',
            body:{
                title: randomTitle,
                author: 'William Dewes'
            }
        }).then(response => {
            expect(response.status).to.equal(201)
        })
    });

    it('Validate title of latest post', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/posts',
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(response.body)

            body.forEach(function(item){
                titleOfPosts.push(item['title'])
            })
        }).then(() => {
            var latestPost = titleOfPosts[titleOfPosts.length -1]
            expect(latestPost).to.equal(randomTitle)
        })
    });
});