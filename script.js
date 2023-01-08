//Ao fazer uma requisição para uma API com o fetch, é necessário converter os dados recebidos com o método .json()
//fetch, requisição, converssão
//toda PROMISSE ela retorna um then caso seja resolvida e Catch caso seja rejeitada
//then funciona como um então, acessa a requisição e o valor retornado ele faz alguma conversão com ele, mas somente se caso a PROMISSE foi resolvida
//Catch significa pegue, caso dê algum erro ela irá cair o catch e mostrar o erro
//independente do resultado o finally vai acontecer
/*const consultaCep = fetch('https://viacep.com.br/ws/30310320/json/')
    .then(resposta => resposta.json())
    .then(r => {
        if (r.erro){
            throw Error('Esse cep não existe!')
        }else
            console.log(r)
    })
    .catch(erro => console.log(erro))
    .finally(mensagem => console.log('Processamento concluído!'));*/


//Outra forma de ser feito, A declaração async function define uma função assíncrona e o operador await é utilizado para esperar por uma Promise. 
//try = tentar catch= pegar

async function buscarEndereco(cep){
    let mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = " ";
    try{
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCepConvertida = await consultaCep.json();
        if(consultaCepConvertida.erro){
            throw Error('Esse cep não existe!')
        }
        const cidade = document.getElementById('cidade');
        const logradouro = document.getElementById('endereco');
        const bairro = document.getElementById('bairro');
        const estado = document.getElementById('estado');

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        bairro.value = consultaCepConvertida.bairro;
        estado.value = consultaCepConvertida.uf;

        console.log(consultaCepConvertida);
        return consultaCepConvertida
    }catch(erro){
        mensagemErro.innerHTML = `CEP inválido. Tente novamente!`
    }
}

const cep = document.getElementById('cep');
//focusout = evento de clica para fora
cep.addEventListener('focusout', () => buscarEndereco(cep.value));