import DynamicFilterRoleAbstructor from '@/lib/DynamicFilter/DynamicFilterRoleAbstructor';
import {
  getRoleFieldColumn,
} from '@/lib/ViewRolesBuilder';

export default class DynamicFilterSortBy extends DynamicFilterRoleAbstructor {

  constructor(sortByFieldKey, sortDirection) {
    super();

    this.filterRoles = {
      columnKey: sortByFieldKey,
      value: sortDirection,
      comparator: 'sort_by',
    };
  }

  /**
   * Builds database query of sort by column on the given direction.
   */
  buildQuery() { 
    const { columnKey = null, value = null } = this.filterRoles;

    return (builder) => {
      const fieldRelation = getRoleFieldColumn(this.tableName, columnKey);
      if (columnKey) {
        builder.orderBy(`${this.tableName}.${fieldRelation.column}`, value.toLowerCase());
      }
    };
  }
}