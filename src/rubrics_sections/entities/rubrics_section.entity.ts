
import { Rubric } from "src/rubrics/entities/rubric.entity";
import { SectionsParameter } from "src/sections_parameters/entities/sections_parameter.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity()
export class RubricsSection extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number; // Columna de clave primaria generada automáticamente

    @Column()
    name: string; // Columna para almacenar el nombre del evento, debe ser único

    @ManyToOne(() => Rubric, rubric => rubric.sections, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'rubricId' })
    rubric: Rubric;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente

    @OneToMany(() => SectionsParameter, sectionParameter => sectionParameter.rubricsSection, { cascade: true, onDelete: 'CASCADE' })
    parameters: SectionsParameter[];

}
