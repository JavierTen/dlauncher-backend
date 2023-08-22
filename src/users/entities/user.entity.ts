import { Entity } from 'typeorm'
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne } from "typeorm";
import { Role } from '../../roles/entities/rol.entity'

@Entity()
export class User {
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

    @Column({ nullable: true, type: 'datetime' })
    birthday: Date; // Columna para almacenar la fecha de cumpleaños (opcional)

    @Column({ type: "bigint", width: 20, unique: true }) // Columna para almacenar un número entero de 15 dígitos
    document: number;

    @Column({ type: "bigint", width: 20 })
    cellphone: number; // Columna para almacenar un número de teléfono único de 15 dígitos

    @Column({ default: false })
    validated: boolean; // Columna para indicar si el usuario está validado

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente

    @ManyToOne(() => Role, role => role.users)
    role: Role; // Relación con la entidad Role, muchos usuarios pueden tener un mismo rol
}
   