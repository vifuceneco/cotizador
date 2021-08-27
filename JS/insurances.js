

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
}

form.addEventListener("submit", cotizador)

$(function(){
    $("#form").css({"background-color": "lightblue"})
});

