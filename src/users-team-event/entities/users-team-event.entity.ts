import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Users } from "src/users/entities/user.entity";
import { Teams } from "src/teams/entities/team.entity";

@Entity()
export class UsersTeamsEvents {
    @PrimaryGeneratedColumn()
    id: number; // Columna de clave primaria generada automáticamente

    @Column({ default: false })
    rol: boolean; // Columna de clave primaria generada automáticamente

    @ManyToOne(() => Users, { onDelete: 'CASCADE' }) // Agrega { onDelete: 'CASCADE' } aquí
    @JoinColumn({ name: 'userId' })
    user: Users;
  
    @ManyToOne(() => Teams, { onDelete: 'CASCADE' }) // Agrega { onDelete: 'CASCADE' } aquí
    @JoinColumn({ name: 'teamId' })
    team: Teams;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente


}
