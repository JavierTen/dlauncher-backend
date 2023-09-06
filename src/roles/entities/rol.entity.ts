import { Users } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    name: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente

    @OneToMany(() => Users, user => user.role) // Un rol puede tener varios usuarios
    users: Users[];

}

