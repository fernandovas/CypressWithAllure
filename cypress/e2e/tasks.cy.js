/// <reference types= "cypress" /> 





describe('Tarefas', () => {




  context('Cadastro', () => {
    it('Deve cadastrar uma nova tarefa', () => {

      var taskName = 'Estudar Java Script'
  
      cy.removeTaskByName(taskName)
  
  
      cy.createTask(taskName)
  
      cy.contains('main div p', taskName)
        .should('be.visible'
        )
    })
  
    it('Não deve permitir tarefa duplicada', () => {
  
      const task = {
        name: 'Ler um livro de NodeJS',
        is_done: false
      }
  
      cy.removeTaskByName(task.name)
  
      // Dado que eu tenha uma tarefa duplicada
     cy.postTask(task)
  
      // Quando eu faço um cadastro dessa tarefa
      cy.createTask(task.name)
  
  
      //Então vejo a mensagem de duplicidade
  
      cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', 'Task already exists!')
    })
  
    it('Validação de campo obrigatório', () =>{
      cy.createTask()
  
      
    }) 

  })

  context('Atualização', () => {
    it('Deve concluir uma tarefa', () =>{
      const taskName = 'Estudar Java Script'

      cy.visit('/')
      
      cy.contains('p', taskName)
        .parent()
        .find('button[class*=ItemToggle]')
        .click()
      
      cy.contains('p', taskName)
        .should('have.css', 'text-decoration-line', 'line-through')
    }) 


  })

  context('Exclusão', () => {
    it('Deve excluir uma tarefa', () =>{
      const taskName = 'Ler um livro de NodeJS'

      cy.visit('/')
      
      cy.contains('p', taskName)
        .parent()
        .find('button[class*=ItemDelete]')
        .click()
      
      cy.contains('p', taskName)
        .should('not.exist')
    }) 


  })



})


