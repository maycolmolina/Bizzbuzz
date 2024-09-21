


//Primeramente calculamos el margen de ganancia y lo renovamos

export const calcularMargenGanancia=(renovacion,costo)=>{

    if(renovacion===0){return 0};
 
    return ((renovacion-costo)/renovacion)*100;
 };

 //Calculamos el retorno de inversion(ROI) te permite evaluar la eficiencia de inversion
//gananciaInversion - costoInversion/costoInversion *

export const calcularROI=(gastoInversion,costoInversion)=>{

    if(costoInversion===0){return 0}
  
    return((gastoInversion-costoInversion)/costoInversion)*100
  }
  
  //Calcular la tasa interna de Inversion es la tasa de descuento que hace que el valor presente neto(VPN)de un proyecto sea igual a cero es un calculo iterativo y no tiene una formula analitica directa
  
  export const calcularTIR=(dineroFlujo, iterativo=0.1)=>{
  
     const maxIteracion=1000;
     const precision=1e-10;
  
     let irr=iterativo;
  
     for(let i=0;i<maxIteracion;i++)
     {
       let npv=0; // valor presente neto
       let derivacion=0;
  
       for(let j=0;j<dineroFlujo.length;j++){
          npv+=dineroFlujo[j]/Math.pow(1+irr,j);
          derivacion -=j*dineroFlujo[j]/Math.pow(1+irr,j+1)
       }
       const newIrr=irr-npv/derivacion
       if(Math.abs(newIrr-irr)<precision)// es una funcion que devuelve el valor absoluto de un numero es decir si es negativo lo pasa positivo
       {
        return newIrr*100 //devuelve la TIR como porcentaje
       }
       irr=newIrr;
     }
     return null // Es decir si no converge la precision del TIR
  }