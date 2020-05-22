<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSequenceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('fe_sequence')) {
            Schema::create('fe_sequence', function (Blueprint $table) {
                $table->string('sequence');
                $table->primary("sequence", "fe_sequence_pk");
                $table->integer('valor');
            });
            if (env('DB_CONNECTION', 'mysql') == "pgsql") {
                $procedure = "CREATE OR REPLACE FUNCTION last_id_from_table(tabla VARCHAR, column_id VARCHAR)
                    RETURNS INTEGER AS
                        \$BODY\$
                        DECLARE
                            ultimo_id INTEGER := 0;
                            last_pkey INTEGER := 0;
                        BEGIN
                            SELECT valor INTO ultimo_id FROM fe_sequence WHERE sequence = tabla;
                            IF ultimo_id IS NULL THEN
                                EXECUTE format('SELECT max(%s) FROM %s', column_id,tabla) INTO last_pkey;
                                IF last_pkey IS NULL THEN
                                    ultimo_id = 1;
                                ELSE
                                    ultimo_id = last_pkey + 1;
                                END IF;
                                INSERT INTO fe_sequence VALUES (tabla, ultimo_id);
                            ELSE
                                    ultimo_id = ultimo_id + 1;
                                UPDATE fe_sequence SET valor = ultimo_id WHERE sequence = tabla;
                            END IF;
                            RETURN ultimo_id;
                        END ;
                        \$BODY\$
                        LANGUAGE plpgsql VOLATILE COST 100;";
                DB::unprepared($procedure);
            }
            if (env('DB_CONNECTION', 'mysql') == "mysql") {
                $mysql_version_check = DB::select(DB::raw('SHOW VARIABLES LIKE "version";'));
                $mysql_version = $mysql_version_check[0]->Value;
                if (substr($mysql_version, 2, 1) < '7' and substr($mysql_version, 4, 1) < '6') {
                    $procedure = "
                        CREATE FUNCTION `last_id_from_table`()
                        RETURNS BIGINT
                        no sql deterministic
                        BEGIN
                        DECLARE `ultimo_id` BIGINT;
                        DECLARE `last_pkey` BIGINT;
                        SET `ultimo_id` = 0;
                        SET `last_pkey` = 0;
                        SELECT valor INTO `ultimo_id` FROM fe_sequence WHERE sequence = 'fe_docelectronico';
                        IF ultimo_id <> 0 THEN
                            SET `ultimo_id` = `ultimo_id` + 1;
                            UPDATE fe_sequence SET valor = `ultimo_id` WHERE sequence = 'fe_docelectronico';
                        ELSE
                            SELECT max(`idDocumento`) INTO last_pkey FROM fe_docelectronico;
                            IF last_pkey <> 0 THEN
                                SET `ultimo_id` = `last_pkey` + 1;
                            ELSE
                                SET `ultimo_id` = 1;
                            END IF;
                            INSERT INTO fe_sequence(sequence, valor) VALUES ('fe_docelectronico', `ultimo_id`);
                        END IF;
                        RETURN `ultimo_id`;
                        END";
                } else {
                    DB::unprepared("SET GLOBAL log_bin_trust_function_creators = 1;");
                    DB::unprepared("DROP FUNCTION IF EXISTS last_id_from_table");
                    $procedure = "CREATE FUNCTION last_id_from_table() RETURNS BIGINT
                    BEGIN
                        DECLARE `ultimo_id` BIGINT;
                        DECLARE `last_pkey` BIGINT;
                        SET `ultimo_id` = 0;
                        SET `last_pkey` = 0;
                        SELECT valor INTO `ultimo_id` FROM fe_sequence WHERE sequence = 'fe_docelectronico';
                        IF ultimo_id <> 0 THEN
                            SET `ultimo_id` = `ultimo_id` + 1;
                            UPDATE fe_sequence SET valor = `ultimo_id` WHERE sequence = 'fe_docelectronico';
                        ELSE
                            SELECT max(`idDocumento`) INTO last_pkey FROM fe_docelectronico;
                            IF last_pkey <> 0 THEN
                                SET `ultimo_id` = `last_pkey` + 1;
                            ELSE
                                SET `ultimo_id` = 1;
                            END IF;
                            INSERT INTO fe_sequence(sequence, valor) VALUES ('fe_docelectronico', `ultimo_id`);
                        END IF;
                        RETURN `ultimo_id`;
                    END;";
                }
                DB::unprepared($procedure);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('fe_sequence');
    }
}
