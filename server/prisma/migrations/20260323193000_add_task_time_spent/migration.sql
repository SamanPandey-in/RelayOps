-- Add persisted task time tracking (seconds)
ALTER TABLE "tasks"
ADD COLUMN "time_spent" INTEGER NOT NULL DEFAULT 0;
