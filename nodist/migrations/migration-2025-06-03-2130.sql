use gdp;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `rol`) VALUES
(1, 'Tester', 'tester@tester.com', '$2b$10$EkV.fvQHtTGFCcA0yfapmegm3dBqzMzusdtol7Zr6YbpHVfjx/cM.', 'ADMIN'),
(2, 'Testera', 'testera@tester.com', '$2b$10$i3PW5BjvsrwA3NblolgBBuy8an5i8VueSsPyIMM/IGe1QlTTjbUGy', 'ADMIN');


INSERT INTO `pets` (`id`, `name`, `age`, `breed`, `type`, `size`) VALUES
(1, 'Conna', 12, 'Rotwailer', 'dog', 'large'),
(2, 'Chatran', 2, 'Siames', 'cat', 'medium'),
(3, 'Bruno', 5, 'cocker', 'dog', 'large'),
(4, 'Oslo', 6, 'Calle', 'cat', 'small');

