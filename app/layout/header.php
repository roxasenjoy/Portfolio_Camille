<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Portfolio</title>
    <link rel="stylesheet" href="../main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <script src="https://unpkg.com/scrollreveal@4"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css">
    
</head>

<body>
  
       
    <button class="hamburger">   
        <span></span>
        <span></span>
        <span></span>
    </button>
    

    <nav class="headerResponsive">
        <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/">A Propos</a></li>
            <li><a href="/">Mes compétences</a></li>
            <li><a href="/" class="active">Mes expériences</a></li>
            <li><a href="/">Mes créations</a></li>
            <li><a href="/">Me contacter</a></li>
        </ul>
    </nav>

    <div class="headerPages">

        <svg viewBox="0 0 1903 174" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#263C59" d="M 0 65 C 477 65 477 110 954 110 L 954 110 L 954 0 L 0 0 Z" stroke-width="0"></path> <path fill="#263C59" d="M 953 110 C 1428 110 1428 71 1903 71 L 1903 71 L 1903 0 L 953 0 Z" stroke-width="0"></path> </svg>   

        <ul class="navContainer">
            <li>
                <a href="/">Accueil</a>
            </li>
            <li>
                <a href="/">A Propos</a>
            </li>
            <li>
                <a href="/">Mes compétences</a>
            </li>
            <li>
                <a href="/" class="active">Mes expériences</a>
            </li>
            <li>
                <a href="/">Mes créations</a>
            </li>
            <li>
                <a href="/">Me contacter</a>
            </li>
        </ul>
    </div>
   

    <script>
        //Ouvre et ferme le menu burger
        document.querySelector('button').addEventListener('click', function() {
            this.classList.toggle('open');
            document.getElementById('svg').classList.toggle('open')
            document.querySelector('nav').classList.toggle('open');
        })
    </script>
</body>
</html>
