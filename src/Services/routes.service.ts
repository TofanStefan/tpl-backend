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
    const used = [];
    routes.forEach((route, index) => {
      const split = route.split(' - ');
      const name = split[0];
      const coord = split[1].split(', ');
      if (!used.includes(name)) {
        stations.push(
          this.station_entity.create({
            name,
            lat: coord[0],
            lng: coord[1],
            order: index + 1,
          }),
        );
        used.push(name);
      }
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
    const busses = [];
    const routes = await this.route_entity.find({
      relations: ['stations'],
    });
    routes.forEach((route) => {
      // find station
      const findStart = route.stations.find((value) => value.name === start);
      const findEnd = route.stations.find((value) => value.name === end);
      if (findStart && findEnd) {
        busses.push(route.number);
      }
    });
    return busses;
  }

  async getRoutes(id) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const polyUtil = require('polyline-encoded');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyAeSsi_FfVyInpDce0WXkmCdsoK4hz9Ta0',
      Promise: Promise,
    });
    let latlngs = null;
    const data = await this.route_entity.findOne({
      where: { number: id },
      relations: ['stations'],
    });

    const waypoints = [];
    const used_names = [];
    data.stations.map((station) => {
      if (waypoints.length <= 24) {
        if (!used_names.includes(station.name)) {
          if (
            (data.number === 3 &&
              ['Sala Sporturilor', 'IRIC'].includes(station.name)) ||
            (data.number === 5 && station.name === 'Selgros')
          ) {
          } else {
            waypoints.push({
              lat: station.lat,
              lng: station.lng,
            });
          }
        }
      }
    });
    await googleMapsClient
      .directions({
        destination: { lat: waypoints[0].lat, lng: waypoints[0].lng },
        origin: { lat: waypoints[0].lat, lng: waypoints[0].lng },
        waypoints: waypoints,
      })
      .asPromise()
      .then((response) => {
        const encoded = response.json.routes[0].overview_polyline.points;
        latlngs = polyUtil.decode(encoded);

        const path = latlngs.map((coord) => {
          return {
            lat: coord[0],
            lng: coord[1],
          };
        });

        data['path'] = path;
      });

    return data;
  }
}
