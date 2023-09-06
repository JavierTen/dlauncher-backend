import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../../departament/entities/departament.entity';
import { Users } from 'src/users/entities/user.entity';

@Entity('municipalities')
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: number;

  @OneToMany(() => Users, user => user.municipality)
  users: Users[]; // Agregamos esta relación para que puedas acceder a los usuarios de esta municipalidad

  @ManyToOne(() => Department, (department) => department.municipalities)
  department: Department; // Asegúrate de que esta relación esté configurada correctamente
}

