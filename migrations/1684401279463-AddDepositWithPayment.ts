import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDepositWithPayment1684401279463 implements MigrationInterface {
  name = 'AddDepositWithPayment1684401279463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cashflow" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "description" character varying, "date" TIMESTAMP NOT NULL, "type" character varying NOT NULL, "userIdId" integer, CONSTRAINT "PK_4cb64c5ef0ef3b8bee6d04bc488" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imgSrc"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imgKey"`);
    await queryRunner.query(
      `ALTER TABLE "cashflow" ADD CONSTRAINT "FK_075bcab3a68174a9673527762dc" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cashflow" DROP CONSTRAINT "FK_075bcab3a68174a9673527762dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "imgKey" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "imgSrc" character varying`,
    );
    await queryRunner.query(`DROP TABLE "cashflow"`);
  }
}
