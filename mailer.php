<?php
// ����������� �������
require_once 'class.phpmailer.php';

//����� ����������
$to = $_POST['email'];
//��������� ���������
$subject = '������ �� ���������� ������� ������� � "����� ���� - ���������� ����� ��� ���� �����"';
//����� ���������
$message = '
                <html>
                    <head>
                        <title>' . $subject . '</title>
                    </head>
                    <body>
                        <p>������� �� ���� ������</p>
                        <p>���: ' . $_POST['name'] . '</p>
                        <p>�������: ' . $_POST['phone'] . '</p>
                        <p>��. �����: ' . $_POST['email'] . '</p>
                        <p>��� �������: ' . $_POST['child__name'] . $_POST['child__surname'] . '</p>
                        <p>������������ ����: ' . $_POST['subject'] . '</p>
                    </body>
                </html>';

echo "<script>alert(".$message.")</script>";


$email = new PHPMailer();

$email->FromName = '����� ���� - ���������� ����� ��� ���� �����';
$email->CharSet = 'UTF-8';
$email->Subject = $subject;
$email->Body = $message;

// ���������� �����������
$email->AddAddress($_POST['email']);

// ��������
if (!$email->send()) {
    echo json_encode($json['error'] = 1);
} else {
    echo json_encode($json['error'] = 0);
}
