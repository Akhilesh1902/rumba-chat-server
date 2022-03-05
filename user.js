const c_users = [];

function join_user(id, userName, roomId) {
  const p_user = { id, userName, roomId };
  c_users.push(p_user);
  console.log(c_users, "user", "\n user length  : ", c_users.length);
  return p_user;
}

console.log("user out " + c_users);

function get_curretn_user(id) {
  console.log("getting message sent user id");

  const user = c_users.find((u) => u.id === id);
  console.log(user);

  return c_users.find((p_user) => p_user.id === id);
}

function user_disconect(id) {
  console.log("disconnecting");
  const index = c_users.findIndex((p_user) => p_user.id === id);
  if (index !== -1) {
    return c_users.splice(index, 1)[0];
  }
}
console.log(c_users);
module.exports = {
  join_user,
  get_curretn_user,
  user_disconect,
};
