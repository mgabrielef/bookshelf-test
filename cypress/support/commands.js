Cypress.Commands.add('getAllBooks', ()=>{
    cy.request({
        method: 'GET',
        url: 'api/book'
    })
})

Cypress.Commands.add('addBook', (name, description, author, year, publisher, genre, pagecount, lang)=>{
    cy.fixture('teste1.png', 'binary').then( image =>{
        const blob = Cypress.Blob.binaryStringToBlob(image, 'image/png')
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('author', author)
        formData.append('year', year)
        formData.append('image', blob, 'teste1.png')
        formData.append('publisher', publisher)
        formData.append('genre', genre)
        formData.append('pagecount', pagecount)
        formData.append('lang', lang)

        cy.request({
            method: 'POST',
            url: 'api/book',
            headers: {
                'content-type': 'multipart/form-data',
            },
            body: formData,
            failOnStatusCode: false
        })    
    })
})

Cypress.Commands.add('editBook', (id, name, description, author, year, publisher, genre, pagecount, lang)=>{   
    cy.request({
        method: 'PATCH',
        url: `api/book/${id}`,
        body: {
            "name": name,
            "description": description,
            "author": author,
            "year": year,
            "publisher": publisher,
            "genre": genre,
            "pagecount": pagecount,
            "lang": lang
        }
    })
})

Cypress.Commands.add('deleteBook', (id)=>{
    cy.request({
        method: 'DELETE',
        url: `api/book/${id}`
    })
})