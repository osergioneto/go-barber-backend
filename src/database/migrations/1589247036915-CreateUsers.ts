import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1589247036915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    }, {
                        name: "name",
                        type: "varchar",
                    }, {
                        name: "password",
                        type: "varchar",
                    }
                    , {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    }, {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }, {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    }, {
                        name: "delete_at",
                        type: "timestamp",
                        isNullable: true,
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
