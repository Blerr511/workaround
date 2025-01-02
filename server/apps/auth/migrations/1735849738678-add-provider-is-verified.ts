import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProviderIsVerified1735849738678 implements MigrationInterface {
  name = 'AddProviderIsVerified1735849738678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth_provider" ADD "isVerified" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth_provider" DROP COLUMN "isVerified"`,
    );
  }
}
