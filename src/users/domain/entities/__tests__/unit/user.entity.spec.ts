import { UserEntity, UserProps } from '../../user.entity';
import { userDataBuilder } from '../../../testing/helpers/user-data-builder';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = userDataBuilder();
    sut = new UserEntity(props);
  });
  it('Constructor: should create a new user entity', () => {
    expect(sut).toBeInstanceOf(UserEntity);
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
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
    expect(sut.createdAt).toBeInstanceOf(Date);
  });
});
