<?php 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require_once realpath(__DIR__ . '/vendor/autoload.php');

    $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    var_dump($dotenv->load());

    $firstname = strip_tags($_POST['firstname']);
    $lastname = strip_tags($_POST['lastname']);
    $phone = strip_tags($_POST['phone']);
    $subject = strip_tags($_POST['subject']);
    $email = strip_tags($_POST['email']);
    $message = strip_tags($_POST['message']);
    $emailSent = false;

    $mail = new PHPMailer(true);
    //$mail->SMTPDebug = 4;
    $mail->isSMTP();
    $mail->Host = $_ENV["MAIL_HOST"];
    $mail->SMTPAuth = true;
    $mail->Port = $_ENV["MAIL_POST"];
    $mail->Username = $_ENV["MAIL_USERNAME"];
    $mail->Password = $_ENV["MAIL_PASSWORD"];

    // Recepteur de l'email de l'utilisateur
    $mail->setFrom($_ENV["MAIL_USERNAME"]); 
    

    $errors = [];
    $data = [];

    // Est ce que le formulaire est submit ? 
    if(isset($_POST['submit'])){

        if (empty($_POST['firstname'])) {
            $errors['firstname'] = 'Votre prénom est obligatoire.';
        }

        if (empty($_POST['lastname'])) {
            $errors['lastname'] = 'Votre nom est obligatoire.';
        }

        if (empty($_POST['email'])) {
            $errors['email'] = 'Votre adresse email est obligatoire.';
        }

        if (empty($_POST['phone'])) {
            $errors['phone'] = 'Votre numéro de téléphone est obligatoire.';
        }

        if (empty($_POST['subject'])) {
            $errors['subject'] = 'Le sujet de votre message est obligatoire.';
        }

        if (empty($_POST['message'])) {
            $errors['message'] = 'Votre message est obligatoire.';
        }


        // Est ce que les éléments sont submits ?
        if(!empty($firstname) && !empty($lastname) && !empty($email) && !empty($phone) && !empty($subject) && !empty($message)){

            //From email address and name
            $mail->AddReplyTo($email, "$firstname $lastname"); 

            //L'adresse email d'OVH va me renvoyer un mail à l'adresse suivante 
            $mail->addAddress($_ENV["MAIL_RECEPTEUR"], "Camille Carpentier");

            //Send HTML or Plain Text email
            $mail->isHTML(true);

            $mail->Subject = "PORTFOLIO : " . $subject;
            $mail->Body =   "Message envoye par : " . $firstname . " " . $lastname . "<br> Numero de telephone : " . $phone . "<br>Message : " . $message;

            $data['success'] = true;
            $data['message'] = 'success';

            $mail->send();
            $emailSent = true;
                

        } else {
            // Afficher des messages d'erreurs
            $data['success'] = false;
            $data['errors'] = $errors;
        }
    } else {
        $data['success'] = false;
        $data['errors'] = $errors;
    }
        
    echo json_encode($data);
        
?>