<?php
//Кому адрес
define('TO','rp-detki@mail.ru');
//Кому имя
define('TO_NAME','Детки Клуб - Творческий центр для всей семьи');
//Заголовок сообщения
define('EMAIL_SUBJECT','Заявка на бесплатное пробное занятие в "Детки Клуб - Творческий центр для всей семьи"');
//Текст сообщения
$message = '<html>
                    <head>
                        <title>' . EMAIL_SUBJECT . '</title>
                    </head>
                    <body>
                        <p>Новая заявка!</p>
                        <br>
                        <p>Имя: ' . $_POST['name'] . '</p>
                        <p>Телефон: ' . $_POST['phone'] . '</p>
                        <p>Эл. адрес: ' . $_POST['email'] . '</p>
                        <p>Имя ребенка: ' . $_POST['children'] . '</p>
                        <p>Дата рождения: ' . $_POST['birthday'] . '</p>
                        <p>Интересующий курс: ' . $_POST['subject'] . '</p>
                    </body>
                </html>';


sentViaStandartMail($message);

// отправка письма с использованием библиотеки PHPMailer
function sentViaPhpMailer($message)
{
    // Подключение мейлера
    require 'PHPMailerAutoload.php';

    $email = new PHPMailer;

    $email->CharSet = 'UTF-8';
    $email->setFrom(TO, TO_NAME);
    $email->AddAddress(TO, TO_NAME);
    $email->subject = EMAIL_SUBJECT;
    $email->Body = $message;
    $email->isHTML(true);

    // Рассылка
    if($email->send()) {
        $data = 'Ваша заявка на пробное занятие отправлена!';

    } else {
        $data = 'К сожалению, что-то пошло не так. Попробуйте записаться позже!';
    }
    echo $data;
}

// отправка письма стандартными средствами php
function sentViaStandartMail($message)
{

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: ' . TO_NAME . ' <' . TO . '>' . "\r\n";
    $headers .= "Bcc: ". TO . "\r\n";

    $resutlt = mail(TO, EMAIL_SUBJECT, $message, $headers);
    if($resutlt) {
        $data = 'Ваша заявка на пробное занятие отправлена!';

    } else {
        $data = 'К сожалению, что-то пошло не так. Попробуйте записаться позже!';
    }
    echo $data;
}