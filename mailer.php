<?php
// Подключение мейлера
require 'PHPMailerAutoload.php';

//от кого адрес
const FROM = 'rp-detki@mail.ru',
    //от кого имя
NAME = 'Детки Клуб - Творческий центр для всей семьи',
    //Заголовок сообщения
SUBJECT = 'Заявка на бесплатное пробное занятие в "Детки Клуб - Творческий центр для всей семьи"';
//Текст сообщения
$message = '<html>
                    <head>
                        <title>' . SUBJECT . '</title>
                    </head>
                    <body>
                        <p>Спасибо за Вашу заявку</p>
                        <p>Имя: ' . $_POST['name'] . '</p>
                        <p>Телефон: ' . $_POST['phone'] . '</p>
                        <p>Эл. адрес: ' . $_POST['email'] . '</p>
                        <p>Имя ребенка: ' . $_POST['children'] . '</p>
                        <p>Дата рождения: ' . $_POST['birthday'] . '</p>
                        <p>Интересующий курс: ' . $_POST['subject'] . '</p>
                    </body>
                </html>';


sentViaPhpMailer($message);

// отправка письма с использованием библиотеки PHPMailer
function sentViaPhpMailer($message)
{
    $email = new PHPMailer;

    $email->CharSet = 'UTF-8';
    $email->setFrom(FROM, NAME);
    $email->AddAddress($_POST['email'], $_POST['name']);
    $email->Subject = SUBJECT;
    $email->Body = $message;
    $email->isHTML(true);

// Рассылка
    if($email->send()) {
        $data = 'На указанный E-mail адрес отправлено письмо!';

    } else {
        $data = 'К сожалению, что-то пошло не так. Попробуйте записаться позже!';
    }
}

// отправка письма стандартными средствами php
function sentViaStandartMail($message)
{

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: ' . NAME . ' <' . FROM . '>' . "\r\n";
    $headers .= "Bcc: ". FROM . "\r\n";

    $resutlt = mail($_POST['email'], SUBJECT, $message, $headers);
    if($resutlt) {
        $data = 'На указанный E-mail адрес отправлено письмо!';

    } else {
        $data = 'К сожалению, что-то пошло не так. Попробуйте записаться позже!';
    }
    echo $data;
}