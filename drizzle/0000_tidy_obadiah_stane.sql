CREATE TABLE `notification` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`novel_id` text,
	`type` text,
	`is_read` integer DEFAULT false,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`novel_id`) REFERENCES `novel`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "type_check" CHECK("notification"."type" != 'new_chapter' OR "notification"."novel_id" IS NOT NULL)
);
--> statement-breakpoint
CREATE TABLE `novel_rating` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`novel_id` text NOT NULL,
	`user_id` text NOT NULL,
	`rating` real NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`novel_id`) REFERENCES `novel`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `novel_rating_novel_id_user_id_unique` ON `novel_rating` (`novel_id`,`user_id`);--> statement-breakpoint
CREATE TABLE `novel_spotlight` (
	`id` integer PRIMARY KEY NOT NULL,
	`image` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`novel_id` text NOT NULL,
	FOREIGN KEY (`novel_id`) REFERENCES `novel`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `novel_chapter` (
	`id` text PRIMARY KEY NOT NULL,
	`chapter_number` integer NOT NULL,
	`title` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`content` text NOT NULL,
	`novel_id` text NOT NULL,
	FOREIGN KEY (`novel_id`) REFERENCES `novel`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `novel_chapter_novel_id_chapter_number_unique` ON `novel_chapter` (`novel_id`,`chapter_number`);--> statement-breakpoint
CREATE TABLE `novel_favorite` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`user_id` text NOT NULL,
	`novel_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`novel_id`) REFERENCES `novel`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `novel_favorite_novel_id_user_id_unique` ON `novel_favorite` (`novel_id`,`user_id`);--> statement-breakpoint
CREATE TABLE `novel` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`genres` text DEFAULT (json_array()),
	`synopsis` text NOT NULL,
	`cover` text,
	`banner` text,
	`total_views` integer DEFAULT 0,
	`status` text DEFAULT 'ongoing',
	`published_at` text DEFAULT (current_timestamp) NOT NULL,
	`last_updated` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `novel_author_title_unique` ON `novel` (`author`,`title`);--> statement-breakpoint
CREATE TABLE `novel_subscribe` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`user_id` text NOT NULL,
	`novel_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`novel_id`) REFERENCES `novel`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `novel_subscribe_novel_id_user_id_unique` ON `novel_subscribe` (`novel_id`,`user_id`);--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`type` text DEFAULT 'user',
	`avatar` text,
	`password` text,
	`provider` text NOT NULL,
	`provider_id` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_provider_id_unique` ON `user` (`provider_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `emailUniqueIndex` ON `user` (lower("email"));