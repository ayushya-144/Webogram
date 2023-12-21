import { errorToaster } from "./toaster";

export async function updateQueryData(api, methodName, dispatch, query, cb) {
  try {
    dispatch(api.util.updateQueryData(methodName, query, cb));
  } catch (error) {
    errorToaster(error);
  }
}
// export async function updateExiQueryData(
//   api,
//   Query,
//   args,
//   dispatch,
//   queryFulfilled
// ) {
//   try {
//     const { data: update } = await queryFulfilled;
//     dispatch(
//       api.util.updateQueryData(Query, undefined, (draft) => {
//         console.log(JSON.stringify(draft));
//         draft.data = update.data;
//       })
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }
