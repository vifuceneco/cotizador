class Cotizacion {
    total = 0;
    productor = "";
    tiposDeRiesgo = [
        {nombre: "Todo riesgo", multiplicador: 3},
        {nombre: "Terceros", multiplicador: 2},
        {nombre: "Básico", multiplicador: 2},
    ]; 

    aseguradoras = [
        {nombre: "La Segunda", precio: 100, productor: "Alfonso Ribotril"},
        {nombre: "La nueva", precio: 300, productor: "Vicente Monero"},
        {nombre: "San Cristobal", precio: 200, productor: "Fernando Brown"},
        {nombre: "Boston", precio: 400, productor: "Ricardo Liniers"},
        {nombre: "La caja", precio: 500, productor: "Lionel Limbo"},
    ];

    constructor(riesgo, persona, aseguradora) {
        this.riesgo = riesgo;
        this.persona = persona;
        this.aseguradora = aseguradora;
    }

    cotizar() {
        let dolarHoy = localStorage.getItem("dolar");
        const aseguradora = this.aseguradoras.filter(aseguradora => aseguradora.name === this.aseguradora);
        const riesgo = this.tiposDeRiesgo.filter(riesgo => riesgo.name === this.riesgo);

        $.ajax("https://www.dolarsi.com/api/api.php?type=valoresprincipales").done(function(cotiz) {
            const nuevoDolar = cotiz.filter((dolar) => dolar["casa"].nombre === "Dólar Blue").reduce((dolar) => dolar.venta);
            if(dolarHoy != nuevoDolar) {
                dolarHoy = nuevoDolar;
                localStorage.setItem("dolar", nuevoDolar);
            }
        }).error(function(error){
            console.alert("Hubo un error en la cotización!");
            console.alert(error);
        });

        if(riesgo && aseguradora) {
            this.total = aseguradora.price * riesgo.multiplicador;
            if(persona === "Juridica") {
                this.total = this.total * 1.21;
            }
        }

        return {total: this.total, productor: this.productor};
    }
        
}

function cotizador(e) {
    e.preventDefault() 
    const input = document.getElementById("cot").value;
    const name = document.getElementById("name").value;

    const insurances = [
        {name: "La Segunda", price: 100, producer: "Alfonso Ribotril"},
        {name: "La nueva", price: 300, producer: "Vicente Monero"},
        {name: "San Cristobal", price: 200, producer: "Fernando Brown"},
        {name: "Boston", price: 400, producer: "Ricardo Liniers"},
        {name: "La caja", price: 500, producer: "Lionel Limbo"},
    ];

    const defaultInsurance = { name: "aumentar su presupuesto", price: 0, producer: "Pablo Rivieri" };

    const selectedInsurance = insurances.reduce((better, insurance) => {
        console.log("better:", better, "insurance:", insurance);
        return better = insurance.price > better.price && insurance.price < input ? insurance : better;
    }, defaultInsurance);

    console.log(`Desde CODERHOUSE SEGUROS le recomendamos ${selectedInsurance.name}. Productor: ${selectedInsurance.producer}`);

    localStorage.setItem("presupuesto", input)
    localStorage.setItem("nombre", name)
    const name2 = localStorage.getItem("nombre");
    localStorage.setItem("resultado", JSON.stringify(insurances))

    // const datoInput = getItem("presupuesto")

    let msg = document.createElement("p");
    msg.innerHTML = `<h3>Gracias por usar CODERHOUSE SEGUROS</h3> <br> ${name2}, usted ingresó ${input}`;
    document.body.appendChild(msg);
    const button = document.createElement('button'); 
    button.type = 'button'; 
    button.innerText = 'Adiós!'; 
    document.body.appendChild(button);
    return false;
}

form.addEventListener("submit", cotizador)

$(function(){
    $("#form").css({"background-color": "lightblue"})
});

