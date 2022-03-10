import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAnimals1604174964818 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'animals',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'nickname',
          type: 'varchar',
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'nationality',
          type: 'varchar',
        },
        {
          name: 'age',
          type: 'varchar',
        },
        {
          name: 'savage',
          type: 'boolean',
          default: false,
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('animals');
  }

}
