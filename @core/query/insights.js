const GET_INSIGHT = `
query dynamic_query($tableName: String, $params: jsonb, $fields: String, $limit: Int, $offset: Int) {
    get_dynamic_data_aggregate_v3(args: {table_name: $tableName, params: $params, computed_fields: $fields, limit_param: $limit, offset_param: $offset}) {
      result
    }
  }
`;

export default {GET_INSIGHT}