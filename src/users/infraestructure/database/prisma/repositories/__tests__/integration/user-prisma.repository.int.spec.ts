import { PrismaClient } from '@prisma/client';
import { UserPrismaRepository } from '../../user-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { setupPrismaTests } from '@/shared/infraestructure/database/prisma/testing/setup-prisma-tests';
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { DatabaseModule } from '@/shared/infraestructure/database/database.module';

describe('UserPrismaRepository integration tests', () => {
  const prismaService = new PrismaClient();
  let sut: UserPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new UserPrismaRepository(prismaService as any);
    await prismaService.user.deleteMany();
  });

  it('should throws error when entity not found', async () => {
    expect(() => sut.findById('FakeId')).rejects.toThrow(
      new NotFoundError('UserModel not found usind ID FakeId')
    );
  });

  it('should finds a entity by id', async () => {
    const entity = new UserEntity(userDataBuilder({}));
    const newUser = await prismaService.user.create({
      data: entity.toJson(),
    });

    const output = await sut.findById(newUser.id);
    expect(output.toJson()).toStrictEqual(entity.toJson());
  });
});
