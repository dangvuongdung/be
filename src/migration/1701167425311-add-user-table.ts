import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUserTable1701167425311 implements MigrationInterface {
    name = 'addUserTable1701167425311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "test"."users" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_user_address" ON "test"."users" ("address") `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "test"."idx_user_address"`)
        await queryRunner.query(`DROP TABLE "test"."users"`)
    }
}
