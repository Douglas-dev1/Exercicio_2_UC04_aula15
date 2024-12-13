/*2-Uma fábrica de bolachas produz pacotes com 500 gramas cada e tem disponível um banco de dados contendo o peso de todos os pacotes por lote produzido.
 *A partir desses dados, a fábrica quer saber qual a variação do maior e do menor pacote e quantos pacotes estão acima e quantos pacotes estão abaixo.
 *Caso a variação ocorra em mais de 20% do lote, deve mostrar uma mensagem dizendo "lote com alta divergência", caso contrário, mostrar mensagem, "lote padrão".
 *Gere um array contendo valores aleatórios entre 400 e 600, para poder usá-lo no exercício.*/

import Scanner from "@codeea/scanner";

let scanner: Scanner;

/*FUNÇÃO PARA GERAR OS PACOTES DE BOLCHA */
function bancoDados(qtdProdutos: number): number[] {
  const pacotesBolacha: number[] = [];
  for (let j = 0; j < qtdProdutos; j++) {
    /*GERANDO PACOTES COM VALORES ALEATORIOS ENTRA 400 E 600*/
    const pacotePeso = Math.floor(Math.random() * (600 - 400 + 1)) + 400;
    pacotesBolacha.push(pacotePeso);
  }
  return pacotesBolacha;
}
/*FUNÇÃO PARA ANALISAR AS AMOSTRAS E COLHER OS DADOS*/
function analisaAmostras(amostra: number[], namostras:number): number[] {
  let resultado: number[] = [];

  let acima: number = 0;
  let abaixo: number = 0;
  let variaMais: number = 0;
  let variacaoFlag: number = 0;
  /*COLETANDO OS MAIORES E OS MENORES VALORES DO VETOR*/
  const maior = Math.max(...amostra);
  const menor = Math.min(...amostra);
  /*CALCULANDO A VARIAÇÃO*/
  const variacao = maior - menor;
  /*CALCULANDO QUANTOS PACOTES ESTÃO ACIMA E QUANTOS ESTAO COM VARIAÇÃO MAIOR QUE 20%*/
  for (let analitics of amostra) {
    if (analitics > 500) {
      acima++;
      if (analitics > ((variacao * 0.2) + 500)) variaMais++;
    } else if (analitics < 500) {
      abaixo++;
      if (analitics < (500 - (variacao * 0.2))) variaMais++;
    }
  }

/*CALCULANDO QUANTOS POR CENTO DO LOTE TEM A VARIAÇÃO MAIOR QUE 20%*/
  if(variaMais>(namostras*0.2)){
    variacaoFlag = 1;
  }
  else
    variacaoFlag = 0;
/*GUARDANDO OS VALORES NAS VARIAVEIS DE RETORNO*/
  resultado.push(maior);
  resultado.push(menor);
  resultado.push(acima);
  resultado.push(abaixo);
  resultado.push(variacao);
  resultado.push(variacaoFlag);
  return resultado;
}

/*PEÇO PARA O USUARIO INFORMAR QUANTAS AMOSTRAS DE PAOTES ALETORIAS ELE QUER E IMPRIMO AS AMOSTRAS NA TELA*/
async function main() {
  for (;;) {
    /*FAZENDO A AQUSIÇÃO DOS DADOS*/
    let amostras = parseInt(
      await scanner.question("Quantas amostras quer gerar?: ")
    );
    /*GERANDO O BANCO*/
    const bancoProdutos = bancoDados(amostras);
    /*MOSTRANOD NA TELA OS RESULTADOS*/
    console.log(`Foram geradas ${amostras} amostras no banco`);
    const resultado: number[] = analisaAmostras(bancoProdutos, amostras);
    console.log(`O produto com maior variação foi ${resultado[0]} gramas, o com a menor foi de ${resultado[1]} gramas, houveram ${resultado[2]} produtos acima, houveram ${resultado[3]} produtos abaixo, a variação foi de ${resultado[4]}`);
      if(resultado[5])
        console.log("A variação foi maior que 20%, lote REPROVADO!");
      else
        console.log("A variação foi menor que 20%, lote APROVADO!");
  }
}

(async () => {
  scanner = new Scanner();
  await main();
  scanner.close();
})();
