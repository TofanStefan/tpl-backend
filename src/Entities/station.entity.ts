import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { route } from './route.entity';

@Entity()
export class station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  order: number;

  @Column('decimal')
  lat: number;

  @Column('decimal')
  lng: number;

  @ManyToOne(() => route, (route) => route.stations)
  route: route;
}
