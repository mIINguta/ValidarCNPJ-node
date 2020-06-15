const express = require('express');
const app = express();
app.use(express.json());

app.get("/:cnpj", (request, response) => {
    const cnpj = request.params.cnpj;
    let resultado;

    if(cnpj == '')  
      resultado = 'CNPJ Inválido';
    
    else if (cnpj.length != 14)
        resultado = 'CNPJ Inválido';
              
    else if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" || cnpj == "99999999999999")  
        resultado = 'CNPJ Inválido';
    else{
        // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultadoVali = soma % 11 < 2 ? 0 : 11 - soma % 11;
  
    if (resultadoVali != digitos.charAt(0))
    resultado = 'CNPJ Inválido';
  
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultadoVali = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultadoVali != digitos.charAt(1))
        resultado = 'CNPJ Inválido';
    else    
        resultado = 'CNPJ Válido';
    }

    response.json(resultado);
}); 
    app.listen(3333, () => {
    console.log("Funfou");
});