export function applyPagination(documents, page, rowsPerPage) {
  console.log(documents?.length);
  console.log(`doc=${documents ? typeof(documents): ""}, page=${page}, rp=${rowsPerPage}`);
  return documents?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}