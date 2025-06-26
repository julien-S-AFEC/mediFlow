ALTER TABLE `uploads` ADD `user_id` INT NULL AFTER `mimetype`;

ALTER TABLE `uploads` ADD KEY `user_id` (`user_id`);

ALTER TABLE `uploads` ADD CONSTRAINT `uploads_lbfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(id) ON DELETE RESTRICT ON UPDATE CASCADE;