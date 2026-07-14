<?php

return [
    'failed' => 'Podane dane logowania są nieprawidłowe.',
    'password' => 'Podane hasło jest nieprawidłowe.',
    'throttle' => 'Zbyt wiele prób logowania. Spróbuj ponownie za :seconds sekund.',
    'registered' => 'Użytkownik został pomyślnie zarejestrowany.',
    'logged_in' => 'Zalogowano pomyślnie.',
    'logged_out' => 'Wylogowano pomyślnie.',
    'validation' => [
        'name' => [
            'required' => 'Pole imię jest wymagane.',
            'string' => 'Imię musi być ciągiem znaków.',
            'max' => 'Imię nie może być dłuższe niż 255 znaków.',
        ],
        'email' => [
            'required' => 'Pole adres e-mail jest wymagane.',
            'string' => 'Adres e-mail musi być ciągiem znaków.',
            'email' => 'Adres e-mail musi być prawidłowy.',
            'max' => 'Adres e-mail nie może być dłuższy niż 255 znaków.',
            'unique' => 'Konto z tym adresem e-mail już istnieje.',
        ],
        'password' => [
            'required' => 'Pole hasło jest wymagane.',
            'string' => 'Hasło musi być ciągiem znaków.',
            'min' => 'Hasło musi mieć co najmniej 8 znaków.',
        ],
        'password_confirmation' => [
            'required' => 'Pole potwierdzenie hasła jest wymagane.',
            'same' => 'Potwierdzenie hasła musi być zgodne z hasłem.',
        ],
    ],
];
