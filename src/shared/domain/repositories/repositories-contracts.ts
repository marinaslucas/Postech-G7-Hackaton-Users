import {Entity} from '../entities/entity';

export interface RepositoryContract<EntityType extends Entity> {
    insert(entity: EntityType): Promise<void>;
    findById(id: string): Promise<EntityType | null>;
    findAll(): Promise<EntityType[]>;
    update(entity: EntityType): Promise<void>;
    delete(id: string): Promise<void>;
}