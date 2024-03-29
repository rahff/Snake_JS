export const fake_password_matcher = (encrypted, candidate) => encrypted === noop_hash_password(candidate);
export const noop_hash_password = (password) => password;