import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RouteService } from 'src/Services/routes.service';
import { UserService } from 'src/Services/user.service';
import { number } from 'yargs';

@Controller('route')
export class RouteController {
  constructor(private routeService: RouteService) {}
  @Post()
  async addRoute(@Body('data') data) {
    await this.routeService.createRoute(data.split('/'));
  }

  @Get('stations')
  async getStations() {
    return await this.routeService.getStations();
  }

  @Get('busses')
  async getBusses(@Query('start') start, @Query('end') end) {
    return await this.routeService.getRoutesByStations(start, end);
  }

  @Get()
  async getRoutes(@Query('number') number) {
    return await this.routeService.getRoutes(number);
  }
}
