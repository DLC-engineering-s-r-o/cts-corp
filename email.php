<?php
if(isset($_POST['email'])) {
	$headers = "Content-Type: text/html; charset=UTF-8";
    $email_to = "chylik.lukas@gmail.com";
    $email_subject = "Nová zpráva z webu CTS CORP., s.r.o.";

    function died($error) {
        // your error code can go here
        echo "Je nám líto, ale u formuláře, který jste vyplnili, se vyskytla chyba.";
        echo "Podrobnosti můžete vidět níže.<br /><br />";
        echo $error."<br /><br />";
        echo "Vráťte se a opravte tyto chyby.<br /><br />";
        die();
    }

    // validation expected data exists
    if(!isset($_POST['first_name']) ||
        !isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['comments'])) {
        died('Je nám líto, při odesílání formuláře se vyskytla chyba.');
    }

    $first_name = $_POST['first_name']; // required
    $last_name = $_POST['last_name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['telephone']; // not required
    $comments = $_POST['comments']; // required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'Zadaná e-mailová adresa je neplatná.<br />';
  }

  if(strlen($comments) < 10) {
    $error_message .= 'Zpráva, kterou jste zadali, je neplatná. Zpráva musí obsahovat minimálně 10 znaků.<br />';
  }

  if(strlen($error_message) > 0) {
    died($error_message);
  }

    $email_message = "Podrobnosti můžete vidět níže.\n\n";

    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    $email_message .= "Jméno: ".clean_string($first_name)."\n";
    $email_message .= "Příjmení: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Tel: ".clean_string($telephone)."\n";
    $email_message .= "Zpráva: ".clean_string($comments)."\n";

// create email headers
$headers = "Content-Type: text/html; charset=UTF-8".'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);
}?>

<!DOCTYPE html>
<html lang="cs-CZ">
<head>
    <meta charset="utf-8" />
    <title>CTS Corp e-mail</title>

    <link rel="stylesheet" href="wwwroot/css/style.min.css" type="text/css" />
</head>
<body>
    <section class="sec">
        <div class="container text-to-center">
            <h2 class="title">Děkujeme za vaši zprávu</h2>
             <p class="desc">Zpráva byla úspěšně odeslána. Ozveme se vám v co najkratším možném čase.</p>
                <a href="index.html" class="button">
                    <span>Domovská stránka</span>
                </a>
        </div>
    </section>
</body>
