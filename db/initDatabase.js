"use client";
import getDatabase from "@/utils/getDatabase";

export default async function initDatabase() {
  const db = await getDatabase();

  // Enable foreign key constraints
  await db.execute(`PRAGMA foreign_keys = ON;`);

  // Group Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS "group" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "title" VARCHAR(255) DEFAULT 'مجموعة بدون عنوان',
      "required_hours" INTEGER DEFAULT 0,
      "required_minutes" INTEGER DEFAULT 0
    );
  `);

  // Employee Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS "employee" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name" VARCHAR(255) DEFAULT 'موظف بدون اسم',
      "image" VARCHAR(255) DEFAULT NULL,
      "annual_leave_days" INTEGER DEFAULT 0,
      "absence_days" INTEGER DEFAULT 0,
      "lwop_days" INTEGER DEFAULT 0,
      "order" INTEGER DEFAULT 0,
      "group_id" INTEGER DEFAULT NULL,
      FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE CASCADE
    );
  `);

  // Year Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS "year" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "employee_id" INTEGER DEFAULT NULL,
      "title" VARCHAR(10) DEFAULT 'سنة بدون عنوان',
      "more_hours" INTEGER DEFAULT 0,
      "more_minutes" INTEGER DEFAULT 0,
      "less_hours" INTEGER DEFAULT 0,
      "less_minutes" INTEGER DEFAULT 0,
      FOREIGN KEY ("employee_id") REFERENCES "employee" ("id") ON DELETE CASCADE
    );
  `);

  // Month Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS "month" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "employee_id" INTEGER DEFAULT NULL,
      "year_id" INTEGER NOT NULL,
      "title" VARCHAR(50) DEFAULT 'شهر في السنة',
      "more_hours" INTEGER DEFAULT 0,
      "more_minutes" INTEGER DEFAULT 0,
      "less_hours" INTEGER DEFAULT 0,
      "less_minutes" INTEGER DEFAULT 0,
      FOREIGN KEY ("employee_id") REFERENCES "employee" ("id") ON DELETE CASCADE,
      FOREIGN KEY ("year_id") REFERENCES "year" ("id") ON DELETE CASCADE
    );
  `);

  // Day Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS "day" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "employee_id" INTEGER NOT NULL,
      "month_id" INTEGER NOT NULL,
      "year_id" INTEGER NOT NULL,
      "title" VARCHAR(50) DEFAULT 'يوم في الشهر',
      "date_month" VARCHAR(50) DEFAULT '0',
      "date_day" VARCHAR(50) DEFAULT '0',
      "required_hours" INTEGER NOT NULL,
      "required_minutes" INTEGER NOT NULL,
      "attend_hour" INTEGER DEFAULT NULL,
      "attend_minute" INTEGER DEFAULT NULL,
      "leave_hour" INTEGER DEFAULT NULL,
      "leave_minute" INTEGER DEFAULT NULL,
      "more_hours" INTEGER DEFAULT 0,
      "more_minutes" INTEGER DEFAULT 0,
      "less_hours" INTEGER DEFAULT 0,
      "less_minutes" INTEGER DEFAULT 0,
      "total_hours" INTEGER DEFAULT 0,
      "total_minutes" INTEGER DEFAULT 0,
      "exit_hour" INTEGER DEFAULT NULL,
      "exit_minute" INTEGER DEFAULT NULL,
      "enter_hour" INTEGER DEFAULT NULL,
      "enter_minute" INTEGER DEFAULT NULL,
      "time_off" BOOLEAN DEFAULT 0,
      "is_lwop" BOOLEAN DEFAULT 0,
      "is_absent" BOOLEAN DEFAULT 0,
      "note" VARCHAR(2000) DEFAULT NULL,
      FOREIGN KEY ("employee_id") REFERENCES "employee" ("id") ON DELETE CASCADE,
      FOREIGN KEY ("month_id") REFERENCES "month" ("id") ON DELETE CASCADE,
      FOREIGN KEY ("year_id") REFERENCES "year" ("id") ON DELETE CASCADE
    );
  `);

  return db;
}