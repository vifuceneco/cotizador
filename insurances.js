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
        const aseguradora = this.aseguradoras.filter(aseguradora => aseguradora.nombre === this.aseguradora, "")[0];
        const riesgo = this.tiposDeRiesgo.filter(riesgo => riesgo.nombre === this.riesgo, "")[0];        

        $.ajax("https://www.dolarsi.com/api/api.php?type=valoresprincipales").done(function(cotiz) {
            const nuevoDolar = cotiz.filter((dolar) => dolar["casa"].nombre === "Dolar Oficial")[0];
            if(nuevoDolar && dolarHoy != nuevoDolar.casa.venta) {
                dolarHoy = nuevoDolar.casa.venta;
                localStorage.setItem("dolar", nuevoDolar.casa.venta);
            }
        }).catch(function(error){
            console.alert("Hubo un error en la cotización!");
            console.alert(error);
        });

        if(riesgo && aseguradora) {
            dolarHoy = dolarHoy.replace(",", ".");
            let total = parseFloat(dolarHoy) * aseguradora.precio * riesgo.multiplicador;
            if(this.personaJuridica) {
                total = total * 1.21;
            }
            this.total = total;
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
    const cotizacion = (new Cotizacion(riesgo, juridica, aseguradora));
    const cotizar = cotizacion.cotizar();
    const total = cotizar["total"];
    const productor = cotizar["productor"];
    const totalAnual = cotizacion.cotizarAnual();
     

    $("#result").html(`<div><h2>Total por mes: $${total} <small>Precio por 12 meses: $${totalAnual}</small></h2><h3>Su productor: ${productor}</h3></div>`)
    return false;
}

form.addEventListener("submit", cotizar);

