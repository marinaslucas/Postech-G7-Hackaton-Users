import { before } from 'node:test';
import { UserEntity, UserProps } from '../../user.entity';
import { faker } from '@faker-js/faker';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    sut = new UserEntity(props);
  });
  it('Constructor: should create a new user entity', () => {
    expect(sut).toBeInstanceOf(UserEntity);
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getters: should return the correct values', () => {
    expect(sut.name).toEqual(props.name);
    expect(sut.email).toEqual(props.email);
    expect(sut.password).toEqual(props.password);
    expect(sut.createdAt).toEqual(sut.props.createdAt);
  });

  it('Getters: should return the correct values types', () => {
    expect(typeof sut.name).toEqual('string');
    expect(typeof sut.email).toEqual('string');
    expect(typeof sut.password).toEqual('string');
    expect(typeof sut.createdAt).toEqual(Date);
  });
});
