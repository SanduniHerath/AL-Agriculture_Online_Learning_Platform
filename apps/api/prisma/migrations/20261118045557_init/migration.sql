-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('STUDENT', 'ADMIN', 'ASSISTANT') NOT NULL DEFAULT 'STUDENT',
    `status` ENUM('ACTIVE', 'SUSPENDED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    `fullName` VARCHAR(120) NOT NULL,
    `mobile` VARCHAR(16) NOT NULL,
    `email` VARCHAR(254) NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `examYear` SMALLINT NULL,
    `school` VARCHAR(160) NULL,
    `district` ENUM('AMPARA', 'ANURADHAPURA', 'BADULLA', 'BATTICALOA', 'COLOMBO', 'GALLE', 'GAMPAHA', 'HAMBANTOTA', 'JAFFNA', 'KALUTARA', 'KANDY', 'KEGALLE', 'KILINOCHCHI', 'KURUNEGALA', 'MANNAR', 'MATALE', 'MATARA', 'MONARAGALA', 'MULLAITIVU', 'NUWARA_ELIYA', 'POLONNARUWA', 'PUTTALAM', 'RATNAPURA', 'TRINCOMALEE', 'VAVUNIYA') NULL,
    `preferredLanguage` ENUM('si', 'en') NOT NULL DEFAULT 'si',
    `mobileVerifiedAt` DATETIME(3) NULL,
    `termsAcceptedAt` DATETIME(3) NULL,
    `termsVersion` VARCHAR(20) NULL,
    `failedLoginCount` INTEGER NOT NULL DEFAULT 0,
    `lockedUntil` DATETIME(3) NULL,
    `lastLoginAt` DATETIME(3) NULL,
    `deviceLimit` TINYINT NULL,
    `totpSecretEnc` VARCHAR(512) NULL,
    `totpEnabledAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_mobile_key`(`mobile`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_role_status_idx`(`role`, `status`),
    INDEX `users_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `refreshTokenHash` CHAR(64) NOT NULL,
    `previousTokenHash` CHAR(64) NULL,
    `deviceName` VARCHAR(120) NULL,
    `userAgent` VARCHAR(512) NULL,
    `ipAddress` VARCHAR(45) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUsedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,
    `revokedAt` DATETIME(3) NULL,
    `revokedReason` ENUM('LOGOUT', 'LOGOUT_ALL', 'DEVICE_LIMIT', 'PASSWORD_RESET', 'ADMIN', 'TOKEN_REUSE', 'EXPIRED') NULL,

    UNIQUE INDEX `sessions_refreshTokenHash_key`(`refreshTokenHash`),
    UNIQUE INDEX `sessions_previousTokenHash_key`(`previousTokenHash`),
    INDEX `sessions_userId_revokedAt_idx`(`userId`, `revokedAt`),
    INDEX `sessions_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp_codes` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `mobile` VARCHAR(16) NOT NULL,
    `purpose` ENUM('REGISTER', 'RESET_PASSWORD', 'CHANGE_MOBILE') NOT NULL,
    `codeHash` CHAR(64) NOT NULL,
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `expiresAt` DATETIME(3) NOT NULL,
    `consumedAt` DATETIME(3) NULL,
    `ipAddress` VARCHAR(45) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `otp_codes_mobile_purpose_createdAt_idx`(`mobile`, `purpose`, `createdAt`),
    INDEX `otp_codes_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher_profile` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `nameEn` VARCHAR(120) NOT NULL,
    `nameSi` VARCHAR(120) NOT NULL,
    `qualificationsEn` VARCHAR(255) NOT NULL,
    `qualificationsSi` VARCHAR(255) NOT NULL,
    `introEn` TEXT NOT NULL,
    `introSi` TEXT NOT NULL,
    `photoKey` VARCHAR(512) NULL,
    `introVideoProvider` ENUM('BUNNY', 'MOCK') NULL,
    `introVideoId` VARCHAR(128) NULL,
    `introVideoDurationSec` INTEGER NULL,
    `statYears` VARCHAR(20) NULL,
    `statStudents` VARCHAR(20) NULL,
    `statPasses` VARCHAR(20) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonials` (
    `id` VARCHAR(191) NOT NULL,
    `quoteEn` TEXT NOT NULL,
    `quoteSi` TEXT NOT NULL,
    `authorEn` VARCHAR(160) NOT NULL,
    `authorSi` VARCHAR(160) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `testimonials_isPublished_sortOrder_idx`(`isPublished`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_settings` (
    `key` VARCHAR(64) NOT NULL,
    `value` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedById` VARCHAR(191) NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announcements` (
    `id` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(200) NOT NULL,
    `titleSi` VARCHAR(200) NOT NULL,
    `bodyEn` TEXT NOT NULL,
    `bodySi` TEXT NOT NULL,
    `audience` ENUM('ALL', 'STUDENTS', 'UNIT_OWNERS') NOT NULL DEFAULT 'ALL',
    `unitId` INTEGER NULL,
    `publishedAt` DATETIME(3) NULL,
    `expiresAt` DATETIME(3) NULL,
    `sendSms` BOOLEAN NOT NULL DEFAULT false,
    `sendEmail` BOOLEAN NOT NULL DEFAULT false,
    `createdById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `announcements_publishedAt_expiresAt_idx`(`publishedAt`, `expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` TINYINT NOT NULL,
    `grade` TINYINT NOT NULL,
    `slug` VARCHAR(80) NOT NULL,
    `titleEn` VARCHAR(200) NOT NULL,
    `titleSi` VARCHAR(200) NOT NULL,
    `descriptionEn` TEXT NULL,
    `descriptionSi` TEXT NULL,
    `sortOrder` INTEGER NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `units_number_key`(`number`),
    UNIQUE INDEX `units_slug_key`(`slug`),
    INDEX `units_grade_sortOrder_idx`(`grade`, `sortOrder`),
    INDEX `units_isPublished_idx`(`isPublished`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_parts` (
    `id` VARCHAR(191) NOT NULL,
    `unitId` INTEGER NOT NULL,
    `code` VARCHAR(10) NOT NULL,
    `titleEn` VARCHAR(200) NOT NULL,
    `titleSi` VARCHAR(200) NOT NULL,
    `sortOrder` INTEGER NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `sub_parts_unitId_sortOrder_idx`(`unitId`, `sortOrder`),
    UNIQUE INDEX `sub_parts_unitId_code_key`(`unitId`, `code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resources` (
    `id` VARCHAR(191) NOT NULL,
    `unitId` INTEGER NOT NULL,
    `type` ENUM('THEORY_NOTE', 'PAST_PAPER_QUESTIONS') NOT NULL,
    `language` ENUM('si', 'en') NOT NULL DEFAULT 'si',
    `fileKey` VARCHAR(512) NOT NULL,
    `fileName` VARCHAR(200) NOT NULL,
    `fileSizeBytes` INTEGER NOT NULL,
    `pageCount` INTEGER NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `resources_unitId_type_language_key`(`unitId`, `type`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `videos` (
    `id` VARCHAR(191) NOT NULL,
    `unitId` INTEGER NOT NULL,
    `subPartId` VARCHAR(191) NULL,
    `kind` ENUM('TEACHING', 'DISCUSSION') NOT NULL,
    `discussionType` ENUM('MCQ', 'STRUCTURED', 'ESSAY') NULL,
    `paperYear` SMALLINT NULL,
    `titleEn` VARCHAR(200) NOT NULL,
    `titleSi` VARCHAR(200) NOT NULL,
    `descriptionEn` TEXT NULL,
    `descriptionSi` TEXT NULL,
    `provider` ENUM('BUNNY', 'MOCK') NOT NULL,
    `providerVideoId` VARCHAR(128) NOT NULL,
    `status` ENUM('UPLOADING', 'PROCESSING', 'READY', 'FAILED') NOT NULL DEFAULT 'PROCESSING',
    `durationSec` INTEGER NOT NULL DEFAULT 0,
    `sortOrder` INTEGER NOT NULL,
    `isPreview` BOOLEAN NOT NULL DEFAULT false,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `videos_unitId_kind_discussionType_sortOrder_idx`(`unitId`, `kind`, `discussionType`, `sortOrder`),
    INDEX `videos_subPartId_sortOrder_idx`(`subPartId`, `sortOrder`),
    UNIQUE INDEX `videos_provider_providerVideoId_key`(`provider`, `providerVideoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `past_papers` (
    `id` VARCHAR(191) NOT NULL,
    `year` SMALLINT NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `past_papers_year_key`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `past_paper_files` (
    `id` VARCHAR(191) NOT NULL,
    `pastPaperId` VARCHAR(191) NOT NULL,
    `kind` ENUM('PAPER', 'MARKING_SCHEME') NOT NULL,
    `part` VARCHAR(8) NOT NULL,
    `language` ENUM('si', 'en') NOT NULL DEFAULT 'si',
    `fileKey` VARCHAR(512) NOT NULL,
    `fileName` VARCHAR(200) NOT NULL,
    `fileSizeBytes` INTEGER NOT NULL,
    `pageCount` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `past_paper_files_pastPaperId_kind_part_language_key`(`pastPaperId`, `kind`, `part`, `language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('UNIT', 'PAST_PAPER_YEAR') NOT NULL,
    `unitId` INTEGER NULL,
    `pastPaperId` VARCHAR(191) NULL,
    `priceLkr` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `products_unitId_key`(`unitId`),
    UNIQUE INDEX `products_pastPaperId_key`(`pastPaperId`),
    INDEX `products_type_isActive_idx`(`type`, `isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `orderNumber` VARCHAR(32) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `productType` ENUM('UNIT', 'PAST_PAPER_YEAR') NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `amountLkr` INTEGER NOT NULL,
    `currency` CHAR(3) NOT NULL DEFAULT 'LKR',
    `status` ENUM('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `provider` ENUM('PAYHERE') NOT NULL DEFAULT 'PAYHERE',
    `providerRef` VARCHAR(64) NULL,
    `paidAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `orders_orderNumber_key`(`orderNumber`),
    INDEX `orders_userId_status_idx`(`userId`, `status`),
    INDEX `orders_status_createdAt_idx`(`status`, `createdAt`),
    UNIQUE INDEX `orders_provider_providerRef_key`(`provider`, `providerRef`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_events` (
    `id` VARCHAR(191) NOT NULL,
    `provider` ENUM('PAYHERE') NOT NULL,
    `idempotencyKey` VARCHAR(128) NOT NULL,
    `orderId` VARCHAR(191) NULL,
    `providerRef` VARCHAR(64) NULL,
    `statusCode` VARCHAR(16) NULL,
    `rawPayload` JSON NOT NULL,
    `signatureValid` BOOLEAN NOT NULL,
    `processingResult` VARCHAR(40) NULL,
    `processedAt` DATETIME(3) NULL,
    `ipAddress` VARCHAR(45) NULL,
    `receivedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payment_events_idempotencyKey_key`(`idempotencyKey`),
    INDEX `payment_events_orderId_idx`(`orderId`),
    INDEX `payment_events_receivedAt_idx`(`receivedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `access_grants` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `unitId` INTEGER NULL,
    `pastPaperId` VARCHAR(191) NULL,
    `source` ENUM('PAYMENT', 'MANUAL') NOT NULL,
    `orderId` VARCHAR(191) NULL,
    `grantedById` VARCHAR(191) NULL,
    `note` VARCHAR(255) NULL,
    `startsAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NULL,
    `revokedAt` DATETIME(3) NULL,
    `revokedById` VARCHAR(191) NULL,
    `revokeReason` VARCHAR(255) NULL,
    `currentFlag` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `access_grants_orderId_key`(`orderId`),
    INDEX `access_grants_expiresAt_idx`(`expiresAt`),
    UNIQUE INDEX `access_grants_userId_unitId_currentFlag_key`(`userId`, `unitId`, `currentFlag`),
    UNIQUE INDEX `access_grants_userId_pastPaperId_currentFlag_key`(`userId`, `pastPaperId`, `currentFlag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `video_progress` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `videoId` VARCHAR(191) NOT NULL,
    `positionSec` INTEGER NOT NULL DEFAULT 0,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `completedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `video_progress_videoId_idx`(`videoId`),
    UNIQUE INDEX `video_progress_userId_videoId_key`(`userId`, `videoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `actorId` VARCHAR(191) NULL,
    `actorRole` ENUM('STUDENT', 'ADMIN', 'ASSISTANT') NULL,
    `action` VARCHAR(64) NOT NULL,
    `entityType` VARCHAR(40) NOT NULL,
    `entityId` VARCHAR(64) NULL,
    `before` JSON NULL,
    `after` JSON NULL,
    `metadata` JSON NULL,
    `ipAddress` VARCHAR(45) NULL,
    `userAgent` VARCHAR(512) NULL,
    `requestId` VARCHAR(128) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_entityType_entityId_idx`(`entityType`, `entityId`),
    INDEX `audit_logs_actorId_createdAt_idx`(`actorId`, `createdAt`),
    INDEX `audit_logs_action_createdAt_idx`(`action`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otp_codes` ADD CONSTRAINT `otp_codes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_settings` ADD CONSTRAINT `site_settings_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `announcements` ADD CONSTRAINT `announcements_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `announcements` ADD CONSTRAINT `announcements_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_parts` ADD CONSTRAINT `sub_parts_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resources` ADD CONSTRAINT `resources_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `videos` ADD CONSTRAINT `videos_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `videos` ADD CONSTRAINT `videos_subPartId_fkey` FOREIGN KEY (`subPartId`) REFERENCES `sub_parts`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `past_paper_files` ADD CONSTRAINT `past_paper_files_pastPaperId_fkey` FOREIGN KEY (`pastPaperId`) REFERENCES `past_papers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_pastPaperId_fkey` FOREIGN KEY (`pastPaperId`) REFERENCES `past_papers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_events` ADD CONSTRAINT `payment_events_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `access_grants` ADD CONSTRAINT `access_grants_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `access_grants` ADD CONSTRAINT `access_grants_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `access_grants` ADD CONSTRAINT `access_grants_pastPaperId_fkey` FOREIGN KEY (`pastPaperId`) REFERENCES `past_papers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `access_grants` ADD CONSTRAINT `access_grants_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `access_grants` ADD CONSTRAINT `access_grants_grantedById_fkey` FOREIGN KEY (`grantedById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `access_grants` ADD CONSTRAINT `access_grants_revokedById_fkey` FOREIGN KEY (`revokedById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `video_progress` ADD CONSTRAINT `video_progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `video_progress` ADD CONSTRAINT `video_progress_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- =============================================================================
-- Hand-written CHECK constraints (Prisma cannot express these in schema.prisma).
-- MySQL 8.0.16+ enforces them on every INSERT and UPDATE.
-- =============================================================================

-- Units: the syllabus has units 1-19 in Grade 12 or 13.
ALTER TABLE `units`
  ADD CONSTRAINT `chk_units_number` CHECK (`number` BETWEEN 1 AND 19),
  ADD CONSTRAINT `chk_units_grade` CHECK (`grade` IN (12, 13));

-- Videos: a teaching video belongs to a sub-part; a discussion video has a type instead.
ALTER TABLE `videos`
  ADD CONSTRAINT `chk_videos_kind` CHECK (
    (`kind` = 'TEACHING' AND `subPartId` IS NOT NULL AND `discussionType` IS NULL)
    OR (`kind` = 'DISCUSSION' AND `subPartId` IS NULL AND `discussionType` IS NOT NULL)
  ),
  ADD CONSTRAINT `chk_videos_duration` CHECK (`durationSec` >= 0);

-- Past paper years.
ALTER TABLE `past_papers`
  ADD CONSTRAINT `chk_past_papers_year` CHECK (`year` BETWEEN 1990 AND 2100);

-- Products: positive price (BR-07) and the reference must match the type.
ALTER TABLE `products`
  ADD CONSTRAINT `chk_products_price` CHECK (`priceLkr` > 0),
  ADD CONSTRAINT `chk_products_target` CHECK (
    (`type` = 'UNIT' AND `unitId` IS NOT NULL AND `pastPaperId` IS NULL)
    OR (`type` = 'PAST_PAPER_YEAR' AND `pastPaperId` IS NOT NULL AND `unitId` IS NULL)
  );

-- Orders always have a positive amount.
ALTER TABLE `orders`
  ADD CONSTRAINT `chk_orders_amount` CHECK (`amountLkr` > 0);

-- Access grants: for exactly one unit OR one past-paper year.
-- currentFlag is TRUE (current) or NULL (revoked/replaced), never FALSE - otherwise the
-- "one current grant per student and product" unique index would not work.
ALTER TABLE `access_grants`
  ADD CONSTRAINT `chk_access_grants_target` CHECK ((`unitId` IS NULL) <> (`pastPaperId` IS NULL)),
  ADD CONSTRAINT `chk_access_grants_current` CHECK (`currentFlag` IS NULL OR `currentFlag` = 1);

-- Progress positions and device limits are sane.
ALTER TABLE `video_progress`
  ADD CONSTRAINT `chk_video_progress_position` CHECK (`positionSec` >= 0);
ALTER TABLE `users`
  ADD CONSTRAINT `chk_users_device_limit` CHECK (`deviceLimit` IS NULL OR `deviceLimit` BETWEEN 1 AND 10);
