import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Users } from '../../users/entities/user.entity';

@Entity('document_types')
export class DocumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Users, (user) => user.documentType)
  users: Users[];
}
