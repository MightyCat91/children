<?php
//от кого адрес
$from = 'rp-detki@mail.ru';
// Кому придет письмо
$to = 'rp-detki@mail.ru';
//от кого имя
$name = 'Детки Клуб - Творческий центр для всей семьи';
//Заголовок сообщения
$subject = 'Заявка на бесплатное пробное занятие в "Детки Клуб - Творческий центр для всей семьи"';
//Текст сообщения
$message = '<html>
                    <head>
                        <title>' . $subject . '</title>
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


sentViaStandartMail($message);

// отправка письма с использованием библиотеки PHPMailer
function sentViaPhpMailer($message)
{
    // Подключение мейлера
    require 'PHPMailerAutoload.php';

    $email = new PHPMailer;

    $email->CharSet = 'UTF-8';
    $email->setFrom($from, $name);
    $email->AddAddress($to, $_POST['name']);
    $email->$subject = $subject;
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
    $headers .= 'From: ' . $name . ' <' . $from . '>' . "\r\n";
    $headers .= "Bcc: ". $from . "\r\n";

    $resutlt = mail($to, $subject, $message, $headers);
    if($resutlt) {
        $data = 'На указанный E-mail адрес отправлено письмо!';

    } else {
        $data = 'К сожалению, что-то пошло не так. Попробуйте записаться позже!';
    }
    echo $data;
}