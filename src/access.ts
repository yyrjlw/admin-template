/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  const permissions: { [k in string]: boolean } = {};
  if (currentUser?.permissions) {
    for (const item of currentUser.permissions) {
      permissions[item] = true;
    }
  }
  return permissions;
}
