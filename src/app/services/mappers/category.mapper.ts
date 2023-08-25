import { Category } from '../../models/category.model';
import { CategoryTO } from '../tos/category-response.to';

export class CategoryMapper {
  static toModel(dto: CategoryTO): Category {
    return {
      id: dto.id,
      name: dto.name,
    };
  }
}
