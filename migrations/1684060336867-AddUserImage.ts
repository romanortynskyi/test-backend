import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUserImage1684060336867 implements MigrationInterface {
  name = 'AddUserImage1684060336867'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "imgSrc" character varying`)
    await queryRunner.query(`ALTER TABLE "user" ADD "imgKey" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imgKey"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imgSrc"`)
  }
}
