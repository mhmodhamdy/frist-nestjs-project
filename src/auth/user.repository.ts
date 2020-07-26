import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, email, password, isAdmin } = createUserDto;
    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = password;
    user.isAdmin = isAdmin;
    await user.save();
    return user;
  }
}
