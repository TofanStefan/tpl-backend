import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { station } from './station.entity';

@Entity()
export class route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @OneToMany(() => station, (station) => station.route, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  stations: station[];
}
