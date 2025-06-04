use gdp;
ALTER TABLE `users` ADD `name` VARCHAR(90) NOT NULL AFTER `id`;
ALTER TABLE `users` CHANGE `password` `password` VARCHAR(60) NOT NULL;