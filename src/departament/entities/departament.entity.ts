import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Municipality } from '../../municipality/entities/municipality.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string; 

  @Column()
  code: number;

  @OneToMany(() => Municipality, (municipality) => municipality.department)
  municipalities: Municipality[];
}
