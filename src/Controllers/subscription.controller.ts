import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { SubscriptionService } from 'src/Services/subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}
  @Post()
  async create(@Body() body) {
    return await this.subscriptionService.create(body);
  }
  @Get()
  async GetAll() {
    return await this.subscriptionService.getAll();
  }
  @Post('update')
  async Update(@Body() body) {
    return await this.subscriptionService.update(body);
  }
  @Delete()
  async Delete(@Query('id') id) {
    return await this.subscriptionService.delete(id);
  }
}
