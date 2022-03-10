import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Animal from './Animal';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Animal, animal => animal.images)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;
}