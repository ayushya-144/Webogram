import { errorToaster } from "./toaster";

export async function updateQueryData(
  getState,
  api,
  methodName,
  dispatch,
  queryFulfilled
) {
  try {
    console.log(api);
    console.log(getState());
    const apiState = getState();
    const state = apiState["home.api"];
    const { data: create } = await queryFulfilled;
    let query;
    for (const key in state.queries) {
      console.log(key);
      query = state.queries[key].originalArgs;
      console.log(query);
      dispatch(
        api.util.updateQueryData(methodName, query, (draft) => {
          console.log(Boolean(query.isPrivate), create.data);
          if (create.data.title.includes(query.search)) {
            if (Boolean(query.isPrivate) == create.data.isPrivate) {
              draft.data.unshift(create.data);
              draft.total++;
            }
          }
        })
      );
    }
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
