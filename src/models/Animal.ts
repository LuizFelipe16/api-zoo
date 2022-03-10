import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('animals')
export default class Animal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  about: string;

  @Column()
  nationality: string;

  @Column()
  age: string;

  @Column()
  savage: boolean;

  @OneToMany(() => Image, image => image.animal, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'animal_id' })
  images: Image[];
}