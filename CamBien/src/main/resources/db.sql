INSERT INTO pump(id, led, setup)
VALUES (1,'0',50) ON DUPLICATE KEY UPDATE id = 1;
