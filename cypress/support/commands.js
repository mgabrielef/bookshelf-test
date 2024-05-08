Cypress.Commands.add('getAllBooks', ()=>{
    cy.request({
        method: "GET",
        url: "api/book"
    })
})

Cypress.Commands.add('addBook', (name, description, author, year, publisher)=>{
    cy.fixture('teste.png', 'binary').then( image =>{
        const blob = Cypress.Blob.binaryStringToBlob(image, "image/png")
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("author", author)
        formData.append("year", year)
        formData.append("image", blob, 'teste.png')
        formData.append("publisher", publisher)

        cy.request({
            method: "POST",
            url: "api/book",
            headers: {
                'content-type': 'multipart/form-data',
            },
            body: formData
        })
    })
})

Cypress.Commands.add('deleteBook', (id)=>{
    cy.request({
        method: "DELETE",
        url: `api/book/${id}`
    })
})