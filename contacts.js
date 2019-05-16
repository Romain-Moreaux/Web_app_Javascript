// "use strict";
var contactManager = {

  init: function(){
    this.contactBook = [];
    this.regex = /^[A-Za-zÀ-ÖØ-öø-ÿ/\-]+$/u;
    this.isTypeOf = [
      "undefined",
      undefined,
      "false",
      false,
      "true",
      true
    ];
    this.displayMsg();
    this.addContact("Lévisse", "Carolle");
    this.addContact("Nelsonne", "Mélodie");
    this.options();
  },

  contactList: function(){
    // altervative method with ES6 for...of
    // for (let [index, contact] of Object.entries(this.contactBook)){
    //   let current = Number(index) + 1;
    //   console.log(`[${current}] nom: ${contact.nom}, prénom: ${contact.prenom}`);
    // }
    this.contactBook.forEach(function(contact, index){
      console.log(`[${index + 1}] nom: ${contact.nom}, prénom: ${contact.prenom}`);
    }, this);

  },

  addContact: function(lastname, firstname){
    debugger;
    if (!lastname || !firstname){
    lastname = String(prompt("Veuillez entrer un nom (caractères autorisés: lettres, accents, -).").toLowerCase());
    firstname = String(prompt("Veuillez entrer un prénom (caractères autorisés: lettres, accents, -).").toLowerCase());
    }

    if ( (this.regex.test(lastname) && !this.isTypeOf.includes(lastname)) && (this.regex.test(firstname) && !this.isTypeOf.includes(firstname)) ){
      let person = {};
      person.nom = lastname;
      person.prenom = firstname;

      this.contactBook.push(person);
      console.log("Le contact à bien été ajouté.");
    }else{
      console.log("La création du contact à échouée, format invalide.");
    }
  },

  deleteContact: function(){
    this.contactList();
    var contactNbr = Number(prompt("Veuillez entrer le numéro du contact à supprimer.")) - 1;
    var found = false;
    this.contactBook.forEach(function(element, index){
      if(index === contactNbr){
        found = true;
        this.contactBook.splice(contactNbr, 1);
      }
    }, this);

    !!found ? console.log("Le contact à bien été supprimé.") : console.log("Numéro de contact inconnu.");
  },

  findContact: function(lastname){
    if(!!lastname){
      var contact = this.contactBook.find( contact => contact.nom === lastname );
    }
    console.log(`nom: ${contact.nom}, prénom: ${contact.prenom}`);
  },

  displayMsg: function(){
    var msg = "Bienvenue dans le gestionnaire de contacts.\n1: Lister les contacts\n2: Ajouter un contact\n3: Supprimer un contact\n4: Rechercher un contact\n0: Quitter";

    console.log(msg);
  },

  options: function(){
    var choice = Number(prompt("Faites un choix parmis les propositions."));

    switch (choice) {
      case 0:
        console.log("Au revoir.");
        return;
      case 1:
        this.contactList();
        break;
      case 2:
        this.addContact();
        break;
      case 3:
        this.deleteContact();
        break;
      case 4:
        this.findContact();
        break;
      default:
        console.log("Vous avez entré un choix non valide, veuillez recommencer.");
        break;
    }

    this.options();
  }

}

var personTest = {
  init: function(){
    Object.setPrototypeOf(this, contactManager);
    this.a = "test";
  },
  b : "TEST"
}

const INST_CM = Object.create(contactManager);
INST_CM.init();
const INST_PERSON = Object.create(personTest);
INST_PERSON.init();
