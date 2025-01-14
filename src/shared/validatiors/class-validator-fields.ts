import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface';

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors;
  validatedData: PropsValidated;
  validate(data: any): boolean {
    throw new Error('Method not implemented.');
  }
}
