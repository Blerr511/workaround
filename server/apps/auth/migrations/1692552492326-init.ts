import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1692552492326 implements MigrationInterface {
    name = 'Init1692552492326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wr_user" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_9159106cd59996eb5e8c4f60b16" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "auth_provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "providerId" character varying NOT NULL, "identifier" character varying NOT NULL, "password" character varying, "userUid" uuid, CONSTRAINT "UQ_PROVIDER_IDENTIFIER" UNIQUE ("providerId", "identifier"), CONSTRAINT "PK_0a6e6348fe38ba49160eb903c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth_provider" ADD CONSTRAINT "FK_7ed9e2fb7c81ef7895589ee2354" FOREIGN KEY ("userUid") REFERENCES "wr_user"("uid") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_provider" DROP CONSTRAINT "FK_7ed9e2fb7c81ef7895589ee2354"`);
        await queryRunner.query(`DROP TABLE "auth_provider"`);
        await queryRunner.query(`DROP TABLE "wr_user"`);
    }

}
