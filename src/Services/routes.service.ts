import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { route } from 'src/Entities/route.entity';
import { station } from 'src/Entities/station.entity';
import { subscription } from 'src/Entities/subscription.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(route)
    private readonly route_entity: Repository<route>,
    @InjectRepository(station)
    private readonly station_entity: Repository<station>,
  ) {}

  async createRoute(routes) {
    const stations: station[] = [];
    routes.forEach((route, index) => {
      const split = route.split(' - ');
      const name = split[0];
      const coord = split[1].split(', ');
      stations.push(
        this.station_entity.create({
          name,
          lat: coord[0],
          lng: coord[1],
          order: index + 1,
        }),
      );
    });
    await this.route_entity.save(
      this.route_entity.create({
        number: 28,
        stations,
      }),
    );
  }
  async getStations() {
    return await this.station_entity
      .createQueryBuilder('station')
      .select('station.name')
      .distinct(true)
      .orderBy('station.name')
      .getRawMany();
  }

  async getRoutesByStations(start, end) {
    const stations = await this.station_entity.find({
      where: { name: In([start, end]) },
      relations: ['route'],
    });

    // if found duplicates we should retunr the bus/line number
    const busses = [];

    stations.forEach((station) => {
      if (!busses.includes(station.route.number)) {
        let filteredInstances = stations.filter(
          (st) => (st.route.number = station.route.number),
        );
        if (filteredInstances.length > 1) busses.push(station.route.number);
      }
    });
    return busses;
  }

  async getRoutes(id) {
    return await this.route_entity.findOne({
      where: { number: id },
      relations: ['stations'],
    });
  }
}
