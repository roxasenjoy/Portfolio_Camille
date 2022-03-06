ScrollReveal().reveal('.header-container');

let dateExperience = document.getElementsByClassName('dateExperience');
let dateContainer = document.getElementById('dateContainer');
let jobs = document.getElementsByClassName('jobs');
let spaceBetweenDate = 20;
let memoryDate = 0;

let arrowLeft = document.getElementById('first');
let arrowRight = document.getElementById('third');
let arrowPosition = 0;

setTransform(memoryDate);
setCreation();



/* Détermine la taille de l'écran */
window.addEventListener("resize", function(event) {
    if(document.body.clientWidth < 1000){
        spaceBetweenDate = 50;
        setTransform(memoryDate)
    } else {
        spaceBetweenDate = 20;
        setTransform(memoryDate)
    }
})

/**
 * Clique sur la flèche pour changer les années 
 */
arrowRight.addEventListener('click', function(){
    arrowPosition++;

    /* Si arrowPosition est supérieur au nombre d'années, on revient au début */
    if(arrowPosition >= dateExperience.length){
        arrowPosition = 0;
    }
    addActiveClass(arrowPosition);
});

/**
 * Clique sur la flèche pour changer les années 
 */
arrowLeft.addEventListener('click', function(){
    arrowPosition--;
    /* Si arrowPosition est supérieur au nombre d'années, on revient au début */
    if(arrowPosition < 0){
        arrowPosition = dateExperience.length - 1;
    }

    addActiveClass(arrowPosition);
});

// Change l'espacement si l'écran est inférieur à 1200px
if(window.screen.width < 1200){
    spaceBetweenDate = 50;
    setTransform(memoryDate);

}

/********
 * Formulaire de contact
 ********/
 $("#btnLoader").css("display", "none");
function sendEmail(){

    /* Action quand un utilisateur submit le formulaire */
    /* .unbind() -> permet d'éviter la duplication des requêtes */
    $("form").unbind().submit(function (event) {

        $(".popup").remove();

        /* Message pour prévenir que le message part... */
        $(".popupMessage").html(
            '<div class="popup isComing"><i class="fas fa-paper-plane"></i><div><p class="type">En cours...</p><p>Votre message est en cours de traitement.</p></div></div>'
        );

        /* Les données qui sont récupérées */
        var formData = {
          firstname: $("#firstname").val(),
          lastname: $("#lastname").val(),
          email: $("#email").val(),
          phone: $("#phone").val(),
          subject: $("#subject").val(),
          message: $("#message").val(),
          submit: true,
        };
    
        /* Traiter les informations dans le fichier : sendEmail.php */
        $.ajax({
          type: "POST",
          url: "sendEmail.php",
          data: formData,
          dataType: "json",
          encode: true,
        }).done(function (data) {

            $(".popup").remove();

            /* Une fois que la requête est effectuée, on affiche le popup adéquate */
            if(data.success === true){
                $(".popupMessage").html(
                    '<div class="popup valid" id="valid"><i class="fas fa-check-circle"></i><div><p class="type">Succès !</p><p>Votre message a bien été envoyé.</p></div></div>'
                );

                setTimeout(function(){ 
                   let validPopUp =  document.getElementById("valid");
                   validPopUp.classList.add("fadeOut");
                 }, 5000);

                 

            } else {
                $(".popupMessage").html(
                    '<div class="popup notValid" id="notValid"><i class="fas fa-times-circle"></i><div><p class="type">Échec !</p><p>Votre formulaire n\'est pas valide.</p></div></div>'
                );

                setTimeout(function(){ 
                    let validPopUp =  document.getElementById("notValid");
                    validPopUp.classList.add("fadeOut");
                  }, 5000);
            }
        });
    
        event.preventDefault();
      });
    
}

/* Défini l'endroit ou l'utilisateur clique | Change le design de la date */ 
for (var i = 0; i < dateExperience.length; i++) {
    dateExperience[i].addEventListener('click', function(e){
        for (var i = 0; i < dateExperience.length; i++) {
            dateExperience[i].className = 'transition dateExperience';
            if(e.target.textContent === dateExperience[i].textContent){
                e.target.className = 'transition dateExperience active';
                arrowPosition = i;
                setTransform(i);
            }
        }   
    });    
}


function addActiveClass(arrowPosition){
    for (var i = 0; i < dateExperience.length; i++) {
        dateExperience[i].className = 'transition dateExperience';
    }

    dateExperience[arrowPosition].className = 'transition dateExperience active';

    setTransform(arrowPosition);
}

/* Permet de déplacer les éléments de 'Mes expériences' */
function setTransform(dateClicked){

    dateContainer.style.transform = "translateX(-" + spaceBetweenDate * dateClicked +"%) translateY(" + 1 * dateClicked +"em)";
    /* Afficher tous les éléments de la date sélectionnée */
    experienceContent = jobs[dateClicked];

    for(let y=0; y < jobs.length; y++){
        jobs[y].classList.remove('active');
    }

    experienceContent.classList.add('active');
    
}

function setCreation(){

    // Création du tableau qui contient toutes les créations
    let titleCreation = ["Visite & Co", "Les cerises,du café", "Chocodrop", "Les P'tits, Monstres", "Affiches, caisse, d'épargne ,", "Jazz au, printemps", "Vans Colors", "Retour, en enfance"];

    let container = document.getElementById('creationContainer'); // Contient toutes les créations
    let count = 0;
    let i = 0;

    // Génération du code HTML qui va être afficher sur notre site internet
    titleCreation.forEach(function(element){
   
        container.innerHTML += "<svg viewBox='0 0 500 500' class='transition' width='100%' > <g id='element_" + i + "' onClick='getElementClicked(" + i + ")'> <a> <path d='M426.5,356.5Q373,463,254,456.5Q135,450,77,350Q19,250,73.5,144.5Q128,39,247,44Q366,49,423,149.5Q480,250,426.5,356.5Z' fill='#263C59'> </path>" +

        "<text x='50%' y='25%' dominant-baseline='middle' text-anchor='middle'  font-size='4em' fill='#FFF' font-family='Balsamiq Sans Regular' id='titleCreation_" + count + "'>" +
        
        "</text></a></g></svg>";

        //Générer les tpsan en fonction de la taille du mot
        

        let countSpacesInString = element.split(" ").length - 1; // Détermine le nombre d'espaces
        let wordsInString = element.split(","); // Sépare tous les mots dans une array 
        let getCurrentElement =  document.getElementById('titleCreation_' + count); // Récupére l'élement ou ajouter les mots 

        // Evite les espaces en trop
        if(element.length < 12){
            countSpacesInString--;
            countSpacesInString = 0;
        }
        
        switch(countSpacesInString){

            case 1: 
                getCurrentElement.innerHTML += " <tspan x='50%' y='50%'>" + wordsInString[0]  + "</tspan>";
                break;

            case 2:
                getCurrentElement.innerHTML += " <tspan x='50%' y='42.5%'>" + wordsInString[0]  + "</tspan>";  
                getCurrentElement.innerHTML += " <tspan x='50%' y='57.5%'>" + wordsInString[1] + "</tspan>"; 
                break;

            case 3:
                getCurrentElement.innerHTML += " <tspan x='50%' y='37.5%'>" + wordsInString[0]  + "</tspan>";  
                getCurrentElement.innerHTML += " <tspan x='50%' y='49.5%'>" + wordsInString[1] + "</tspan>"; 
                getCurrentElement.innerHTML += " <tspan x='50%' y='60.5%'>" + wordsInString[2] + "</tspan>";
                break;

            default:
                getCurrentElement.innerHTML += " <tspan x='50%' y='50%'>" + element + "</tspan>"; 
                break;
        }

        i++;
        count++;
    });

}

function getElementClicked(element){

    let titleCreation = ["Visite&Co", "Les-cerises-du-café", "Chocodrop", "Les-Ptits-Monstres", "Affiches-caisse-depargne", "Jazz-au-printemps", "Vans-Colors", "Retour-en-enfance"];

    location.href = "/experiences/" + titleCreation[element] + ".php";
}



