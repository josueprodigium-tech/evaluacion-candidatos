CREATE TABLE `applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`city` text NOT NULL,
	`education` text NOT NULL,
	`experience` text NOT NULL,
	`availability` text NOT NULL,
	`instructions` text NOT NULL,
	`priorities` text NOT NULL,
	`feedback` text NOT NULL,
	`interview` text NOT NULL,
	`score` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
