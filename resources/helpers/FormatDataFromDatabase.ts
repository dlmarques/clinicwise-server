export function formatDataFromDatabase(
  data: { [key: string]: any } | { [key: string]: any }[]
) {
  let auxData;
  if (Array.isArray(data)) {
    //do something
  } else {
    const { _id, __v, ...rest } = data;
    auxData = { ...rest };
  }
  return auxData;
}
