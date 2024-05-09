/// <reference types="cypress" />

describe('Bookshelf tests', () => {
  it('should return all books in the bookshelf', () => {
    cy.getAllBooks()
      .should((response)=>{
        expect(response.status).equal(200)
        expect(response.body).to.have.property('Livros')
      })
  })

  it('should add book to the bookshelf', () => {
    let book = 'book ' + Math.floor(Math.random() * 100000)
    cy.addBook(book, 
    "teste", 
    book, 
    2000, 
    book,
    "teste",
    100,
    "teste"
    ).then((response)=>{
      const dec = new TextDecoder();
      //console.log(JSON.parse(dec.decode(response.body)))
      const responseJSON = JSON.parse(dec.decode(response.body))
      console.log(responseJSON.book.id)
      expect(response.status).equal(200)
      expect(responseJSON.message).equal("Livro adicionado com sucesso")
    })
  })

  it('should shown error message when creating book with already existing name', ()=> {
    cy.addBook("Teste", 
    "Teste", 
    "Teste", 
    2024, 
    "Teste"
    ).then((response)=>{
      const dec = new TextDecoder();
      //console.log(JSON.parse(dec.decode(response.body)))
      const responseJSON = JSON.parse(dec.decode(response.body))
      expect(response.status).equal(200)
      expect(responseJSON.message).equal("Esse livro já está no banco de dados")
    })
  })

  it.only('should delete book from the bookshelf', () => {
    cy.addBook("book to delete", "test", "test", 2000, "test", "test", 100, "test")
      .then(response=>{
        let dec = new TextDecoder();
        let responseJSON = JSON.parse(dec.decode(response.body))
        let id = responseJSON.book.id

        cy.deleteBook(id).then((response)=>{
          expect(response.status).equal(200)
          expect(response.body.message).equal("Livro deletado com sucesso")
        })
      })
  });
})

