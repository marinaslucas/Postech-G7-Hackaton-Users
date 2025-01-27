import { SignupUseCase } from '../../../application/usecases/signup-users.usecase';
import { UsersController } from '../../users.controller';

const userInputData: SignupUseCase.Input = {
  name: 'test name',
  email: 'a@a.com',
  password: '1234',
};

const userOutput: SignupUseCase.Output = {
  id: '177312f6-0b6e-4378-b62c-a4ac5e7eec3c',
  name: 'test name',
  email: 'a@a.com',
  password: '1234',
  createdAt: new Date(),
};

describe('UsersController', () => {

  let sut = new UsersController();
  const execute = jest.fn();

  const mockExecute = {
    execute
  } as any;

  beforeEach(async () => {
    sut = new UsersController();
    sut['signupUseCase'] = mockExecute;
    sut['signinUseCase'] = mockExecute;;
    sut['getUserUseCase'] = mockExecute;;
    sut['listUsersUseCase'] = mockExecute;
    sut['updateUserUseCase'] = mockExecute;
    sut['updatePasswordUseCase'] = mockExecute;
    sut['deleteUserUseCase'] = mockExecute;
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a user', async () => {
    execute.mockResolvedValueOnce(userOutput);
    const result = await sut.create(userInputData);
    expect(result).toStrictEqual(userOutput);
    expect(execute).toHaveBeenCalledWith(userInputData);
  });

  it('should signin a user', async () => {
    execute.mockResolvedValueOnce(userOutput);
    const result = await sut.login(userInputData);
    expect(result).toStrictEqual(userOutput);
    expect(execute).toHaveBeenCalledWith(userInputData);
  });

  it('should update a user', async () => {
    execute.mockResolvedValueOnce({ ...userOutput, name: 'novo nome' });
    const result = await sut.update('1', { name: 'novo nome' });
    expect(result).toStrictEqual({ ...userOutput, name: 'novo nome' });
    expect(execute).toHaveBeenCalledWith({ id: '1', name: 'novo nome' });
  });

  it('should update a user', async () => {
    execute.mockResolvedValueOnce({ ...userOutput, name: 'novo nome' });
    const result = await sut.update('1', { name: 'novo nome' });
    expect(result).toStrictEqual({ ...userOutput, name: 'novo nome' });
    expect(execute).toHaveBeenCalledWith({ id: '1', name: 'novo nome' });
  });

  it('should update password', async () => {
    execute.mockResolvedValueOnce({ ...userOutput, password: '456' });
    const result = await sut.updatePassword('1', { password: '123', newPassword: '456' });
    expect(result).toStrictEqual({ ...userOutput, password: '456' });
    expect(execute).toHaveBeenCalledWith({ id: '1', password: '123', newPassword: '456' });
  });

  it('should delete a user', async () => {
    execute.mockResolvedValueOnce({});
    const result = await sut.remove('1');
    expect(execute).toHaveBeenCalledWith({ id: '1' });
  });

  it('should find one user', async () => {
    execute.mockResolvedValueOnce(userOutput);
    const result = await sut.findOne('1');
    expect(result).toStrictEqual(userOutput);
    expect(execute).toHaveBeenCalledWith({ id: '1' });
  });

  it('should list users', async () => {
    execute.mockResolvedValueOnce([userOutput]);
    const result = await sut.search({
      page: 1,
      perPage: 1,
      sortDir: 'asc',
      filter: userInputData.name
    })
    expect(execute).toHaveBeenCalledWith({
      page: 1,
      perPage: 1,
      sortDir: 'asc',
      filter: userInputData.name
    })
    expect(result).toStrictEqual([userOutput]);
  });
});
