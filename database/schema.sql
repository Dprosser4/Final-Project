set client_min_messages to warning;

-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz(6) not null default now() ,
	"role" TEXT /* NOT NULL */,
  "firstName" TEXT,
  "lastName" TEXT,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."projects" (
	"projectId" serial NOT NULL,
	"poNumber" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"zipcode" TEXT NOT NULL,
	"notes" TEXT DEFAULT '',
  "dateScheduled" timestamp with time zone DEFAULT NULL,
  "dateCompleted" timestamp with time zone DEFAULT NULL,
	"completed" BOOLEAN NOT NULL DEFAULT FALSE,
	"assignedTo" int,
	"createdAt" timestamptz(6) not null default now(),
	CONSTRAINT "projects_pk" PRIMARY KEY ("projectId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."images" (
	"imageId" serial NOT NULL,
	"url" TEXT NOT NULL,
	"project" integer NOT NULL,
	CONSTRAINT "images_pk" PRIMARY KEY ("imageId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "projects" ADD CONSTRAINT "projects_fk0" FOREIGN KEY ("assignedTo") REFERENCES "users"("userId");

ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("project") REFERENCES "projects"("projectId");
