//cria as variáveis que serão utilizadas para armazenar o número secreto e a lista com todos os números secretos já utilizados nessa run
let numeroMaximo = 10;
let numerosEscolhidos = [];
let numeroDoJogo;
//Variável utilizada para mostrar diversos textos na tela na mesma tag HTML, permitindo assim o site ficar dinâmico segundo a ação do usuário
 function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
 }
//Chama da exibirTextoNaTela para o início do jogo
document.addEventListener('DOMContentLoaded', function(){
    exibirTextoNaTela('h1', 'jogo do número secreto');
    exibirTextoNaTela('p', 'Selecione um número de 1 a 10');
});
 //Função que cria randomicamente o número secreto e armazena na variável númeroDoJogo, 
 //ela também já adiciona esse número a uma lista, afim de não haver repetição do número secreto até os 10 números serem escolhidos
function numeroSecreto(){
    numeroDoJogo = parseInt(Math.random() * 10 + 1);
    if (numerosEscolhidos.includes(numeroDoJogo)){
        numeroSecreto();
    }   else{
        numerosEscolhidos.push(numeroDoJogo);
        return numeroDoJogo;
    }
}
//chama o número secreto
numeroSecreto();
//Função que acessa o campo de input que o usuário colocar como tentativa
function numeroEscolhido(){
    return (document.querySelector('.container__input').value);
}
//Função usada para limpar o campo de reposta do usuário como implementação da função novo jogo
function limparCampo(){
    document.querySelector('.container__input').value = '';
}
//Função acionada quando o usuário clica em novo jogo
//A função muda a exibição na tela segundo a função exibirNaTela, limpa o campo e desativa o botão de novo jogo
//Ela chama um novo número secreto e verifica se o tamanho da listas de números escolhidos já atingiu 10
//Então ela esvazia a lista novamente se for o caso
function novoJogo(){
    exibirTextoNaTela('p', 'Selecione um número de 1 a 10');
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    numeroSecreto();
    if (numerosEscolhidos.length == numeroMaximo){
        numerosEscolhidos = [];
    } 
}
//Função acionada quando o botão de chutar é acionado
//Ela cria a variável com a resposta do jogador de acordo com a função numeroEscolhido
//Verifica o valor do numero chutado de acordo com o numero secreto e 
//muda o texto na tela de acordo e ativa o botão de novo jogo, se o usuário acertar.
 function verificarChute(){
    let numeroDoJogador = numeroEscolhido();
    if (numeroDoJogador == numeroDoJogo){
        exibirTextoNaTela('.texto_resposta', 'Parabéns! Você acertou o numero secreto!');
        document.getElementById('reiniciar').removeAttribute('disabled');
        return true;
    }   if (numeroDoJogador > numeroDoJogo){
            exibirTextoNaTela('.texto_resposta', 'Você errou o número secreto é menor');
            return false
    }   else {
        exibirTextoNaTela('.texto_resposta', 'Você errou! O número secreto é maior');
        return false
    }

 }
 