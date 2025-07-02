import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/models/user.models';

@Injectable()
export class SeedersService implements OnModuleInit {
  private readonly logger = new Logger(SeedersService.name)

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async onModuleInit() {
    await this.userSeeder()
  }

  async userSeeder() {
    const superadminExists = await this.userModel.findOne({
      where: { role: 'SUPERADMIN' },
    })

    if (superadminExists) {
      this.logger.log('Superadmin already exists !')
      return
    }

    const hashedPassword = await bcrypt.hash(process.env.SUPPERADMIN_PASSWORD || '12345678', 10)

    await this.userModel.create({
      username: process.env.SUPPERADMIN_USERNAME || 'Muhammadrizo',
      email: process.env.SUPPERADMIN_EMAIL || 'm701rizo@gmail.com',
      password: hashedPassword,
      role: 'SUPERADMIN',
    })

    this.logger.log('Superadmin successfull created!')
  }
}
