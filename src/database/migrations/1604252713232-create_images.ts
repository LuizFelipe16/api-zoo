import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1604252713232 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
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
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'animal_id',
          type: 'integer',
        }
      ],
      foreignKeys: [
        {
          name: 'ImageAnimal',
          columnNames: ['animal_id'],
          referencedTableName: 'animals',
          referencedColumnNames: ['id'],

          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
