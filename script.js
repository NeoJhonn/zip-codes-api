function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('rua').value=("");
  document.getElementById('bairro').value=("");
  document.getElementById('cidade').value=("");
  document.getElementById('uf').value=("");
  document.getElementById('complemento').value=("");
}



function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
  //Atualiza os campos com os valores.
  document.getElementById('rua').value=(conteudo.logradouro);
  document.getElementById('bairro').value=(conteudo.bairro);
  document.getElementById('cidade').value=(conteudo.localidade);
  document.getElementById('uf').value=(conteudo.uf);
  document.getElementById('complemento').value=(conteudo.complemento);
} //end if.
else {
  //CEP não Encontrado.
  limpa_formulário_cep();
  alert("CEP não encontrado.");
}
}



// adicionar máscara ao cep (XXXXX-XXX)
const cep = document.getElementById('cep')
cep.addEventListener('keypress', (event) => {
  
  const inputValue = event.target.value;
  //Expressão regular para validar o CEP (XXXXX-XXX).
  const numericRegex = /^\d{5}-?\d{3}$/;

  if (!numericRegex.test(inputValue)) {
    //o regex /[^0-9^-]/g substitui tudo que não for letra ou caracter '-' por nulo('')
    event.target.value = inputValue.replace(/[^0-9^-]/g, '');
  }
  
  // concatenar o traço depois do 5º número
  if(inputValue.length === 5 ) {
    cep.value += '-'
  }
})







function pesquisacep(valor) {
//Nova variável "cep" somente com dígitos.
var cep = valor;

//Verifica se campo cep possui valor informado.
if (cep != "") {

  //

  //Expressão regular para validar o CEP (XXXXX-XXX).
  var validacep = /^\d{5}-?\d{3}$/;

  //Valida o formato do CEP.
  if(validacep.test(cep)) {

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('rua').value="...";
      document.getElementById('bairro').value="...";
      document.getElementById('cidade').value="...";
      document.getElementById('uf').value="...";
      document.getElementById('complemento').value="...";

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

  } //end if.
  else {
      //cep é inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
  }
} //end if.
else {
  //cep sem valor, limpa formulário.
  limpa_formulário_cep();
}
};