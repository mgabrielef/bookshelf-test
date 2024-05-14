/// <reference types='cypress' />

describe('Bookshelf tests', () => {
  it('should return all books in the bookshelf', () => {
    cy.getAllBooks()
      .should((response)=>{
        expect(response.status).equal(200)
        expect(response.body).to.have.property('Livros')
      })
  })

  it('should return book by its id', () => {
    cy.getBookById(80).then((response)=>{
      expect(response.status).equal(200)
      console.log(response.body[0].id)
      expect(response.body[0]).to.have.property('id')
    })
  });

  it('should add book to the bookshelf', () => {
    let book = 'book ' + Math.floor(Math.random() * 100000)
    cy.addBook(book, 
    'teste', 
    book, 
    2000, 
    book,
    'teste',
    100,
    'teste'
    ).then((response)=>{
      let dec = new TextDecoder();
      //console.log(JSON.parse(dec.decode(response.body)))
      let responseJSON = JSON.parse(dec.decode(response.body))
      expect(response.status).equal(200)
      expect(responseJSON.message).equal('Livro adicionado com sucesso')
    })
  })

  it('should shown error message when creating book with already existing name', ()=> {
    cy.addBook('teste', 'teste', 'teste', 2000, 'teste', 'teste', 100, 'teste')
      .then((response)=>{
        let dec = new TextDecoder();
        //console.log(JSON.parse(dec.decode(response.body)))
        let responseJSON = JSON.parse(dec.decode(response.body))
        expect(response.status).equal(400)
        expect(responseJSON.message).equal('Esse livro já está no banco de dados')
      })
  })

  it('should edit book\'s info', () => {
    let book = 'book ' + Math.floor(Math.random() * 100000)
    cy.addBook(book, 'test', book, 2000, book, 'test', 100, 'test')
      .then(response=>{
        let dec = new TextDecoder();
        let responseJSON = JSON.parse(dec.decode(response.body))
        let id = responseJSON.book.id

        cy.editBook(id, 'edited ' + book, 'test', 'edited ' + book, 2000, 'edited ' + book, 'test', 100, 'test')
          .then((response)=>{
            expect(response.status).equal(201)
            expect(response.body.message).equal('Livro atulizado com sucesso')
          })
      })
  });


  it('should delete book from the bookshelf', () => {
    cy.addBook('book to delete', 'test', 'test', 2000, 'test', 'test', 100, 'test')
      .then(response=>{
        let dec = new TextDecoder();
        let responseJSON = JSON.parse(dec.decode(response.body))
        let id = responseJSON.book.id

        cy.deleteBook(id).then((response)=>{
          expect(response.status).equal(204)
        })
      })
  });
})

