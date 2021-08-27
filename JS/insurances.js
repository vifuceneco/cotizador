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

    constructor(riesgo = "", personaJuridica = false, aseguradora = "") {
        this.riesgo = riesgo;
        this.persona = personaJuridica;
        this.aseguradora = aseguradora;
    }

    cotizar() {
        let dolarHoy = localStorage.getItem("dolar");
        const aseguradora = this.aseguradoras.filter(aseguradora => aseguradora.name === this.aseguradora);
        const riesgo = this.tiposDeRiesgo.filter(riesgo => riesgo.name === this.riesgo);
        console.log(aseguradora, riesgo);

        $.ajax("https://www.dolarsi.com/api/api.php?type=valoresprincipales").done(function(cotiz) {
            const nuevoDolar = cotiz.filter((dolar) => dolar["casa"].nombre === "Dólar Blue").reduce((dolar) => dolar.venta);
            if(dolarHoy != nuevoDolar) {
                dolarHoy = nuevoDolar;
                localStorage.setItem("dolar", nuevoDolar);
            }
        }).catch(function(error){
            console.alert("Hubo un error en la cotización!");
            console.alert(error);
        });

        if(riesgo && aseguradora) {
            this.total = aseguradora.price * riesgo.multiplicador;
            if(this.personaJuridica) {
                this.total = this.total * 1.21;
            }
            this.productor = aseguradora.productor;
        }

        return {total: this.total, productor: this.productor};
    }

    cotizarAnual() {
        return this.total * 12 * .9;
    }
        
}

function cotizar(e) {
    e.preventDefault();

    const nombre = $("#form #nombre").val();
    const riesgo = $("#form #riesgo").val();
    const aseguradora = $("#form #aseguradora").val();
    const juridica = $("#form #juridica").prop("checked");
    const cotizacion = (new Cotizacion(riesgo, juridica, aseguradora)).cotizar();
    const total = cotizacion["total"];
    const totalAnual = cotizacion.cotizarAnual();
    const productor = cotizacion["productor"];
     

    $("#result").html(`<div><h2>Total por mes: ${total} <small>Precio por 12 meses: ${totalAnual}</small></h2><h3>Su productor: ${productor}</h3></div>`)
    return false;
}

form.addEventListener("submit", cotizar);

