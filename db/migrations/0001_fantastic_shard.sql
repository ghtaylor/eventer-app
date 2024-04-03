ALTER TABLE "tickets" DROP CONSTRAINT "tickets_event_id_events_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "type" SET DATA TYPE varchar(256);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
