function criar_vacina() {
    //Seleção da section com propriedade grid que irão os cards de vacina
    const section_grid = document.querySelector('section.section-grid');

    //Criação do molde do card dentro da section
    const card_vacina = document.createElement('div');
    card_vacina.setAttribute('class', 'card-vacina');
    section_grid.appendChild(card_vacina);

    //Criando a parte superior do card de vacina
    const cabeca_card = document.createElement('div');
    cabeca_card.setAttribute('class', 'cabeca-card');
    card_vacina.appendChild(cabeca_card);
    //preenchendo a parte superior do card com informações
    //Titulo
    const titulo_vacina = document.createElement('h2');
    titulo_vacina.setAttribute('id', 'titulo-vacina');
    //Quantidade da dose
    const qtd_dose = document.createElement('label');
    cabeca_card.setAttribute('id', 'qtd-dose');
    //Data da dose
    const data_dose = document.createElement('time');
    cabeca_card.setAttribute('id', 'data-dose');
    //Colocar o titulo, label e data como filho do elemento cabeca-card
    cabeca_card.appendChild(titulo_vacina);
    cabeca_card.appendChild(qtd_dose);
    cabeca_card.appendChild(data_dose);
    //Preenchendo com informações
    titulo_vacina.innerText = "Nome vacina";
    qtd_dose.innerText = "2° dose"
    data_dose.innerText = "11/03/2023"

    //Criação do modelo de para colocar a imagem
    const image_card = document.createElement('div');
    image_card.setAttribute('class', 'image-card');
    card_vacina.appendChild(image_card);
    //Criação do elemento de imagem
    const imagem_comprovante_car = document.createElement('img');
    //Definição dos atributos do elemento de img
    imagem_comprovante_car.setAttribute('id', 'imagem-comprovante-car');
    imagem_comprovante_car.setAttribute('src', '/img/image-comprovante.png');
    //Colocando como filho da div image-card
    image_card.appendChild(imagem_comprovante_car);

    //Criação do modelo de vencimento-card
    const vencimento_card = document.createElement('div');
    vencimento_card.setAttribute('class', 'vencimento-card');
    //Colocando como filho do card-vacina
    card_vacina.appendChild(vencimento_card);
    //Criando o elemento de texto
    const proxima_dose = document.createElement('h2')
    proxima_dose.setAttribute('id', 'proxima-dose')                    
    //Definindo o elemento texto como filho
    vencimento_card.appendChild(proxima_dose)
    //Preenchendo com informações
    proxima_dose.innerText = 'Não há próxima dose'

}