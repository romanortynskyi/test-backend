import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRecoveryCode1684327028472 implements MigrationInterface {
    name = 'AddUserRecoveryCode1684327028472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "recoveryCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "recoveryCode"`);
    }

}
