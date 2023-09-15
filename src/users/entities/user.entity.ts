import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn, BeforeInsert } from "typeorm";
import { Roles } from '../../roles/entities/rol.entity'
import { Municipality } from "src/municipality/entities/municipality.entity";
import { DocumentType } from "src/document-type/entities/document-type.entity";
import * as crypto from 'crypto';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number; // Columna de clave primaria generada automáticamente

  @Column({ unique: true })
  email: string; // Columna para almacenar el correo electrónico, debe ser único

  @Column({ length: 60 })
  password: string; // Columna para almacenar la contraseña

  @Column({ length: 45 })
  name: string; // Columna para almacenar el nombre con longitud máxima de 45 caracteres

  @Column({ length: 45 })
  lastname: string; // Columna para almacenar el apellido con longitud máxima de 45 caracteres

  @Column({ nullable: true, type: 'date' })
  birthday: Date; // Columna para almacenar la fecha de cumpleaños (opcional)

  @Column({ type: "bigint", width: 20, unique: true }) // Columna para almacenar un número entero de 15 dígitos
  document: number;

  @Column({ type: "bigint", width: 20 })
  cellphone: number; // Columna para almacenar un número de teléfono único de 15 dígitos

  @Column({ default: false })
  validated: boolean; // Columna para indicar si el usuario está validado

  @Column({ unique: true })
  token: string; // Columna para almacenar el nombre del equipo, debe ser único

  generateRandomToken(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomBytes = crypto.randomBytes(length);

    let token = '';
    for (let i = 0; i < randomBytes.length; i++) {
      token += characters[randomBytes[i] % characters.length];
    }

    return token;
  }

  @BeforeInsert()
  generateToken() {
    this.token = this.generateRandomToken(6); // Cambia la longitud si es necesario
  }

  @Column()
  avatar: number;

  @BeforeInsert()
  generateRandomAvatar() {
    // Genera un número aleatorio entre 1 y 10
    this.avatar = Math.floor(Math.random() * 10) + 1;
  }

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente

  @ManyToOne(() => Municipality, municipality => municipality.users, { eager: true })
  @JoinColumn({ name: 'municipalityId' })
  municipality: Municipality;

  @ManyToOne(() => DocumentType, documentType => documentType.users, { eager: true })
  @JoinColumn({ name: 'documentTypeId' }) // Establece un valor predeterminado para el tipo de documento
  documentType: DocumentType;

  @ManyToOne(() => Roles, role => role.users,{ eager: true })
  @JoinColumn({ name: 'roleId' })
  role: Roles; // Relación con la entidad Role, muchos usuarios pueden tener un mismo rol
}
