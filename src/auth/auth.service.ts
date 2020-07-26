import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { SignInUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private jwtService: JwtService, // @InjectRepository(UserRepository) // private userRepository: UserRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    // return this.userRepository.signUp(createUserDto);

    const { username, email, password, isAdmin } = createUserDto;

    const checkUsername = await this.userModel.findOne({ username });
    if (checkUsername) {
      throw new BadRequestException('username already token');
    }
    const checkEmail = this.userModel.findOne({ email });
    if (checkEmail) {
      throw new BadRequestException('Email already token');
    }

    const user = new this.userModel({
      username,
      email,
      password,
      isAdmin,
    });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return user;
  }

  async signIn(signInUserDto: SignInUserDto): Promise<{ accessToken: string }> {
    const { email, password } = signInUserDto;
    let user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Incorrect Password');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Incorrect password');
    }

    const payload = { _id: user._id, isAdmin: user.isAdmin === true };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
