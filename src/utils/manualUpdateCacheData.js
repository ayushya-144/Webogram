import { errorToaster } from "./toaster";

export async function updateQueryData(
  api,
  Query,
  searchQuery,
  dispatch,
  queryFulfilled
) {
  try {
    const { data: create } = await queryFulfilled;
    if (create.data.title.includes(searchQuery.search) === false) {
      searchQuery.search = "";
    }
    if (create.data.isPrivate) {
      searchQuery.isPrivate = true;
    }
    dispatch(
      api.util.updateQueryData(Query, searchQuery, (draft) => {
        draft.data.unshift(create.data);
      })
    );
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
