const path  = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio, paciente) {
        this.numero = numero;
        this.escritorio = escritorio;
        this.paciente = paciente;
    }
}

class TicketControl {


    // Inicializamos todos los datos
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson() {
        return{
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        
    }

    /* Leer el archivo JSON o la BD y comoaramos los datos que existen en el archivo
        Json, con los del this. del get toJson
    */
    init() {
        // Lee el archivo data.json 
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');

        // Si el this.hoy es igual al dia de hoy, carga los valores actuales a sus propiedades correspondientes
        if( hoy === this.hoy ){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;

        }else{
            // Significa que es otro dia
           // Sino, se reinicia la el archivo data.json (Base de datos), ejecutando la funcion guardarDB

            this.guardarDb();
        }
    }

    guardarDb() {
        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson) );
    }

    siguiente() {
        this.ultimo += 1;

        // null se le asigna a ticket, indicandole que no se encuentra atendiendo en este momento
        const ticket = new Ticket( this.ultimo, null, null );

        // Agregamos el ultimo ticket al arreglo de tickets
        this.tickets.push( ticket );

        this.guardarDb();

        return 'Ticket ' + ticket.numero;
    }

    atenderTicket( escritorio, paciente ) {
        
        // Se terminaron los turnos o tickets y retornamos null
        if( this.tickets.length === 0){
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio; // Le asignamos escritorio al ticket
        ticket.paciente = paciente;

        this.ultimos4.unshift( ticket ); // Añadimos el ticket al principio del arreglo de los ultimos 4

        if( this.ultimos4.length > 4) {
            // Cuando Sobre pasa los 4 elementos removemos el último elemento del arreglo de los ultimos4
            this.ultimos4.splice(-1,1);
        }

        this.guardarDb();

        return ticket;

    }
}

module.exports = TicketControl;
