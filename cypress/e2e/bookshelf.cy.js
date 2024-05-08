/// <reference types="cypress" />

describe('Bookshelf tests', () => {
  it('should return all books in the bookshelf', () => {
    cy.getAllBooks()
      .should((response)=>{
        expect(response.status).equal(200)
      })
  })

  it('should add book to the bookshelf', () => {
    let book = 'book ' + Math.floor(Math.random() * 100000)
    cy.addBook(book, 
    "Teste8", 
    book, 
    "2000-04-23", 
    book
    ).then((response)=>{
      expect(response.status).equal(200)
    })
  })

  it('should shown error message when creating book with already existing name', ()=> {
    cy.addBook("Teste8", 
    "Teste8", 
    "Teste8", 
    "2000-04-23", 
    "Teste8"
    ).then((response)=>{
      const dec = new TextDecoder();
      //console.log(JSON.parse(dec.decode(response.body)))
      const responseJSON = JSON.parse(dec.decode(response.body))
      expect(response.status).equal(200)
      expect(responseJSON.message).equal("Este livro já está no banco de dados.")
    })
  })

  it.only('should delete book from the bookshelf', () => {
    cy.deleteBook(25).then((response)=>{
      expect(response.status).equal(200)
    })
  });
})

