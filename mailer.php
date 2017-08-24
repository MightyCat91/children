<?php
// Подключение мейлера
require_once 'class.phpmailer.php';

//Почта получателя
$to = $_POST['email'];
//Заголовок сообщения
$subject = 'Заявка на бесплатное пробное занятие в "Детки Клуб - Творческий центр для всей семьи"';
//Текст сообщения
$message = '
                <html>
                    <head>
                        <title>' . $subject . '</title>
                    </head>
                    <body>
                        <p>Спасибо за Вашу заявку</p>
                        <p>Имя: ' . $_POST['name'] . '</p>
                        <p>Телефон: ' . $_POST['phone'] . '</p>
                        <p>Эл. адрес: ' . $_POST['email'] . '</p>
                        <p>Имя ребенка: ' . $_POST['child__name'] . $_POST['child__surname'] . '</p>
                        <p>Интересующий курс: ' . $_POST['subject'] . '</p>
                    </body>
                </html>';

echo "<script>alert(".$message.")</script>";


$email = new PHPMailer();

$email->FromName = 'Детки Клуб - Творческий центр для всей семьи';
$email->CharSet = 'UTF-8';
$email->Subject = $subject;
$email->Body = $message;

// Добавление получателей
$email->AddAddress($_POST['email']);

// Рассылка
if (!$email->send()) {
    echo json_encode($json['error'] = 1);
} else {
    echo json_encode($json['error'] = 0);
}
