<?php
    $id = $_POST['id'];
    $monthBook = $_POST['monthBook'];
    $description = str_replace("'", "\'", $_POST['description']);

    $ini = parse_ini_file('../app.ini', true);

    $link = mysqli_connect($ini[database][host], $ini[database][user], $ini[database][password], $ini[database][name]) or die('Ошибка');
    mysqli_set_charset($link, 'utf8');

    // При добавлении новой книги месяца, старая книга месяца теряет свой статус
    if ($monthBook == 1)
        mysqli_query($link, "UPDATE catalogue SET monthBook = 0 WHERE monthBook = 1");

    // Изменение у книги статуса «Книга месяца» и описания в базе данных
    mysqli_query($link, "UPDATE catalogue SET monthBook = '$monthBook', description = '$description' WHERE id = '$id'");