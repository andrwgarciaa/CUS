const PasswordRuleWarning = ({
  type,
  filled,
}: {
  type: string;
  filled: boolean;
}) => {
  const passwordMessages: { [key: string]: string } = {
    length: "Password must be at least 8 characters",
    upper: "Password must contain at least one uppercase letter",
    number: "Password must contain at least one number",
    match: "Password confirmation must match",
  };
  return filled ? (
    <p className="text-green-500 text-sm">&#10003; {passwordMessages[type]}</p>
  ) : (
    <p className="text-red-500 text-sm">&#10007; {passwordMessages[type]}</p>
  );
};

export default PasswordRuleWarning;
