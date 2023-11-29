import { MigrationInterface, QueryRunner } from 'typeorm'

export class addNftTable1701169350697 implements MigrationInterface {
    name = 'addNftTable1701169350697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "test"."nfts" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "token_id" numeric NOT NULL, "expire" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_65562dd9630b48c4d4710d66772" PRIMARY KEY ("id"))`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test"."nfts"`)
    }
}
