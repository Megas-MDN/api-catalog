export const removePassword = <T>(obj: T) => {
  const { password, ...withoutPassword } = obj as T & { password: string };
  return withoutPassword as T;
};
