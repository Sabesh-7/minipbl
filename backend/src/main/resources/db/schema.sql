-- Smart Workflow Rule Engine — Database Reference Schema
-- PostgreSQL 15+
--
-- In development, Hibernate auto-creates these tables (ddl-auto=update).
-- Run this script manually only when setting up a fresh production database.
--
--   psql -U postgres -c "CREATE DATABASE rule_engine;"
--   psql -U postgres -d rule_engine -f db/schema.sql

CREATE TABLE IF NOT EXISTS app_users (
    id        BIGSERIAL    PRIMARY KEY,
    username  VARCHAR(255) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,
    role      VARCHAR(50)  NOT NULL
);

CREATE TABLE IF NOT EXISTS rules (
    id          BIGSERIAL    PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    priority    VARCHAR(50)  NOT NULL,
    condition   TEXT         NOT NULL,
    action      VARCHAR(255) NOT NULL,
    webhook_url VARCHAR(1000),
    active      BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP    NOT NULL,
    updated_at  TIMESTAMP    NOT NULL
);

CREATE TABLE IF NOT EXISTS execution_logs (
    id             BIGSERIAL    PRIMARY KEY,
    rule_id        BIGINT       REFERENCES rules(id) ON DELETE SET NULL,
    rule_name      VARCHAR(255) NOT NULL,
    input_data     TEXT,
    condition_met  BOOLEAN      NOT NULL,
    action         VARCHAR(255),
    success        BOOLEAN      NOT NULL,
    error_message  TEXT,
    executed_at    TIMESTAMP    NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_execution_logs_executed_at ON execution_logs(executed_at DESC);
CREATE INDEX IF NOT EXISTS idx_execution_logs_rule_id     ON execution_logs(rule_id);
CREATE INDEX IF NOT EXISTS idx_execution_logs_success     ON execution_logs(success);
