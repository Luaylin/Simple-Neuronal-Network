const fs = require('fs');

//Nro Entradas: 35
let entryes = 35;

//Sumatoria de entradas
let inputs = fs.readFileSync('patron.txt', 'utf8').split(';').map((element) => Number(element));

//bias de entrada
let bias = fs.readFileSync('bias_entrada.txt', 'utf8').split('\r\n').map((element) => Number(element));

//Neta entrada
let neta = [];
for (let i = 0; i < entryes; i++) {
    neta.push(inputs[i]+bias[i]);
}

//Salida de la capa de entrada
let outputEntry = [];
for (let i = 0; i < entryes; i++) {
    outputEntry.push(1/(1+Math.exp(-neta[i])));
}

//Pesos capa entrada oculta
let weightsEntryHidden = fs.readFileSync('pesos_capa_entrada_oculta.txt', 'utf8').split('\r\n').map((element) => element.split('\t').map((element) => Number(element)));

//Sumatoria oculta
let sumHidden = [];
let aux = 0;
for (let i = 0; i < weightsEntryHidden[0].length; i++) {
    for (let j = 0; j < weightsEntryHidden.length; j++) {
        aux += weightsEntryHidden[j][i]*outputEntry[j];
    }
    sumHidden.push(aux);
    aux = 0;
}

//Bias oculta
let biasHidden = fs.readFileSync('bias_oculta.txt', 'utf8').split('\r\n').map((element) => Number(element));

//Netas ocultas
let netaHidden = [];
for (let i = 0; i < sumHidden.length; i++) {
    netaHidden.push(sumHidden[i]+biasHidden[i]);
}

//Salida oculta
let outputHidden = [];
for (let i = 0; i < netaHidden.length; i++) {
    outputHidden.push(1/(1+Math.exp(-netaHidden[i])));
}

//Pesos oculta salida
let weightsHiddenOutput = fs.readFileSync('pesos_capa_oculta_salida.txt', 'utf8').split('\r\n').map((element) => element.split('\t').map((element) => Number(element)));

//Sumatoria salida
let sumOutput = [];
aux = 0;
for (let i = 0; i < weightsHiddenOutput[0].length; i++) {
    for (let j = 0; j < weightsHiddenOutput.length; j++) {
        aux += weightsHiddenOutput[j][i]*outputHidden[j];
    }
    sumOutput.push(aux);
    aux = 0;
}
//Bias salida
let biasOutput = fs.readFileSync('bias_salida.txt', 'utf8').split('\r\n').map((element) => Number(element));

//Netas salida
let netaOutput = [];
for (let i = 0; i < sumOutput.length; i++) {
    netaOutput.push(sumOutput[i]+biasOutput[i]);
}

//Salida
let output = [];
for (let i = 0; i < netaOutput.length; i++) {
    output.push(1/(1+Math.exp(-netaOutput[i])));
}
//Error
let error = 0.75;

for (let i = 0; i < output.length; i++) {
    if(output[i]>error){
        console.log("El numero es: "+(i));
        break;
    }
    if(i===output.length-1) console.log("No se encontro el numero");
}
