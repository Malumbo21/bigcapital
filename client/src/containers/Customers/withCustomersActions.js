import { connect } from 'react-redux';
import {
  fetchCustomers,
  fetchCustomer,
  submitCustomer,
  editCustomer,
  deleteCustomer,
  deleteBulkCustomers,
} from 'store/customers/customers.actions';
import t from 'store/types';

export const mapDispatchToProps = (dispatch) => ({
  requestFetchCustomers: (query) => dispatch(fetchCustomers({ query })),
  requestDeleteCustomer: (id) => dispatch(deleteCustomer({ id })),
  requestDeleteBulkCustomers: (ids) => dispatch(deleteBulkCustomers({ ids })),
  requestSubmitCustomer: (form) => dispatch(submitCustomer({ form })),
  requestEditCustomer: (id, form) => dispatch(editCustomer({ id, form })),
  requestFetchCustomer: (id) => dispatch(fetchCustomer({ id })),
  addCustomersTableQueries: (queries) =>
    dispatch({
      type: t.CUSTOMERS_TABLE_QUERIES_ADD,
      payload: { queries }
    }),
});

export default connect(null, mapDispatchToProps);
