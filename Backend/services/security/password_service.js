export const fake_password_matcher = (encrypted, candidate) => encrypted === fake_hash_password(candidate);
export const fake_hash_password = (_) => "########";