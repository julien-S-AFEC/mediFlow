CREATE TABLE `medi_flow`.`uploads` (
    `id` INT NOT NULL AUTO INCREMENT,
    `filename` VARCHAR(60) NOT NULL,
    `temp_filename` VARCHAR(60) NOT NULL,
    `path` VARCHAR(100) NOT NULL,
    `mimetype` VARCHAR(100) NOT NULL,
    PRIMARY KEY(`id`)
)