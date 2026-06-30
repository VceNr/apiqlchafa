import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('kpis')
  getKpis() {
    return this.dashboardService.getKpis();
  }

  @Get('financial-summary')
  getFinancialSummary() {
    return this.dashboardService.getFinancialSummary();
  }

  @Get('recent-orders')
  getRecentOrders() {
    return this.dashboardService.getRecentOrders();
  }

  @Get('alerts')
  getAlerts() {
    return this.dashboardService.getAlerts();
  }

  @Get('system-status')
  getSystemStatus() {
    return this.dashboardService.getSystemStatus();
  }

  @Get('recent-activity')
  getRecentActivity() {
    return this.dashboardService.getRecentActivity();
  }
}
