<?php
    $id = $_POST['id'];
    $author = str_replace("'", "\'", $_POST['author']);

    $ini = parse_ini_file('../app.ini', true);

    $link = mysqli_connect($ini[database][host], $ini[database][user], $ini[database][password], $ini[database][name]) or die('Ошибка');
    mysqli_set_charset($link, 'utf8');

    // Изменение у книги автора в базе данных
    mysqli_query($link, "UPDATE catalogue SET author = '$author' WHERE id = '$id'");