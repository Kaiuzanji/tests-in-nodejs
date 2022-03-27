# Teoria do Teste

  ## MOCK
  - O MOCK é o objeto necessário para o teste funcionar

    ### Cenário
      - Ponto A
      - Ponto B
      - Ponto C

      - A => B | Gera o objeto de teste
      - B => C | o mock para  rodar o teste de B => C é o resultado de A => B

      - A => B => C | Esta forma é incorreta pois o teste está duplicado

  ## STUB
  - O STUB serve para interceptar chamadas externas ( databases, external api's ... )
  - garantir que o etste ocorrerá offline( sem sistema, sem internet, sem memória )

  ## SPY
  - O SPY é um tipo de STUB, mas é usado para validar como a função foi chamada, com quais parâmetros e quantas vezes



