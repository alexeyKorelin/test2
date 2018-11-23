export const checkUser = (props) => {
  if (!isServer(props)) return;
  const {query: {initialState: {auth: {user}}}, res} = props;
  if (!user) {
    res.redirect('/?action=unauthorized');
  }
}

export const checkNotFound = (props) => {
  if (!isServer(props)) return;
  const {query: {initialState: {status}}, res} = props;
  if (status == 404) {
    res.redirect('/not_found');
  }
}

export const checkAccess = (props) => {
  if (!isServer(props)) return;
  const {query: {initialState: {auth: {user}, status}}, res} = props;
  if (status == 403) {
    const action = user ? 'access_denied' : 'unauthorized';
    res.redirect(`/?action=${action}`)
  }
}

const isServer = (props) => {
  const {req, res} = props;
  return !!req;
}
